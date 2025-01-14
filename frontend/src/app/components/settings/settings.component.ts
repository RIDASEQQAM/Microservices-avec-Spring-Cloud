import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Configuration Settings</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="configForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="fill">
            <mat-label>Days to Show Orders</mat-label>
            <input matInput type="number" formControlName="days">
            <mat-hint>Number of days of orders to display</mat-hint>
            <mat-error *ngIf="configForm.get('days')?.hasError('required')">
              This field is required
            </mat-error>
            <mat-error *ngIf="configForm.get('days')?.hasError('min')">
              Must be at least 1 day
            </mat-error>
          </mat-form-field>

          <div class="actions">
            <button mat-raised-button color="primary" type="submit" [disabled]="!configForm.valid || loading">
              {{ loading ? 'Updating...' : 'Update Configuration' }}
            </button>
          </div>
        </form>

        <div class="current-config mt-4" *ngIf="currentConfig">
          <h3>Current Configuration</h3>
          <p>Showing orders from the last {{ currentConfig }} days</p>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-width: 400px;
      margin: 0 auto;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
    }
    .mt-4 {
      margin-top: 2rem;
    }
    .current-config {
      padding: 16px;
      background-color: #f5f5f5;
      border-radius: 4px;
    }
  `]
})
export class SettingsComponent implements OnInit {
  configForm: FormGroup;
  loading = false;
  currentConfig?: number;

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService,
    private snackBar: MatSnackBar
  ) {
    this.configForm = this.fb.group({
      days: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadCurrentConfig();
  }

  loadCurrentConfig(): void {
    this.configService.getConfig().subscribe({
      next: (response) => {
        this.currentConfig = response.value;
        this.configForm.patchValue({ days: this.currentConfig });
      },
      error: () => this.showError('Failed to load current configuration')
    });
  }

  onSubmit(): void {
    if (this.configForm.valid) {
      this.loading = true;
      const days = this.configForm.get('days')?.value;
      
      this.configService.updateConfig(days).subscribe({
        next: () => {
          this.loading = false;
          this.showSuccess('Configuration updated successfully');
          this.loadCurrentConfig();
        },
        error: () => {
          this.loading = false;
          this.showError('Failed to update configuration');
        }
      });
    }
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
  }
}
