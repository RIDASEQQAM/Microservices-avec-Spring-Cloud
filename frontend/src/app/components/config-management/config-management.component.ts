import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ConfigService } from '../../services/config.service';

interface ServiceConfig {
  timeoutEnabled: boolean;
  timeoutDuration: number;
  retryAttempts: number;
  metricsEnabled: boolean;
}

@Component({
  selector: 'app-config-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatSlideToggleModule
  ],
  template: `
    <div class="config-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Service Configuration</mat-card-title>
          <mat-card-subtitle>Manage microservice settings</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <form #configForm="ngForm" (ngSubmit)="saveConfig()">
            <div class="config-grid">
              <mat-card class="config-section">
                <mat-card-header>
                  <mat-card-title>Timeout Settings</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <mat-slide-toggle
                    [(ngModel)]="config.timeoutEnabled"
                    name="timeoutEnabled">
                    Enable Timeout Simulation
                  </mat-slide-toggle>
                  
                  <mat-form-field appearance="outline">
                    <mat-label>Timeout Duration (ms)</mat-label>
                    <input
                      matInput
                      type="number"
                      [(ngModel)]="config.timeoutDuration"
                      name="timeoutDuration"
                      [disabled]="!config.timeoutEnabled">
                  </mat-form-field>
                </mat-card-content>
              </mat-card>

              <mat-card class="config-section">
                <mat-card-header>
                  <mat-card-title>Retry Settings</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <mat-form-field appearance="outline">
                    <mat-label>Retry Attempts</mat-label>
                    <input
                      matInput
                      type="number"
                      [(ngModel)]="config.retryAttempts"
                      name="retryAttempts">
                  </mat-form-field>
                </mat-card-content>
              </mat-card>

              <mat-card class="config-section">
                <mat-card-header>
                  <mat-card-title>Metrics Settings</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <mat-slide-toggle
                    [(ngModel)]="config.metricsEnabled"
                    name="metricsEnabled">
                    Enable Service Metrics
                  </mat-slide-toggle>
                </mat-card-content>
              </mat-card>
            </div>

            <div class="form-actions">
              <button
                mat-raised-button
                color="warn"
                type="button"
                (click)="resetConfig()">
                <mat-icon>restore</mat-icon>
                Reset to Defaults
              </button>
              <button
                mat-raised-button
                color="primary"
                type="submit">
                <mat-icon>save</mat-icon>
                Save Changes
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .config-container {
      padding: 20px;
    }

    .config-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin: 20px 0;
    }

    .config-section {
      height: 100%;
    }

    .config-section mat-card-content {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 20px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }

    mat-slide-toggle {
      margin-bottom: 15px;
    }

    mat-form-field {
      width: 100%;
    }

    button mat-icon {
      margin-right: 8px;
    }
  `]
})
export class ConfigManagementComponent implements OnInit {
  config: ServiceConfig = {
    timeoutEnabled: false,
    timeoutDuration: 5000,
    retryAttempts: 3,
    metricsEnabled: true
  };

  constructor(
    private configService: ConfigService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadConfig();
  }

  async loadConfig() {
    try {
      const config = await this.configService.getConfig();
      this.config = { ...this.config, ...config };
    } catch (error) {
      console.error('Error loading config:', error);
      this.showSnackBar('Error loading configuration');
    }
  }

  async saveConfig() {
    try {
      await this.configService.updateConfig(this.config);
      this.showSnackBar('Configuration saved successfully');
    } catch (error) {
      console.error('Error saving config:', error);
      this.showSnackBar('Error saving configuration');
    }
  }

  resetConfig() {
    this.config = {
      timeoutEnabled: false,
      timeoutDuration: 5000,
      retryAttempts: 3,
      metricsEnabled: true
    };
    this.showSnackBar('Configuration reset to defaults');
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}
