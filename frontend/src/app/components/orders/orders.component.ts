import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../models/order.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Create Order</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="orderForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="fill">
            <mat-label>Description</mat-label>
            <input matInput formControlName="description">
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Quantity</mat-label>
            <input matInput type="number" formControlName="quantite">
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Date</mat-label>
            <input matInput [matDatepicker]="picker" formControlName="date">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Amount</mat-label>
            <input matInput type="number" formControlName="montant">
          </mat-form-field>

          <button mat-raised-button color="primary" type="submit" [disabled]="!orderForm.valid">
            Create Order
          </button>
        </form>
      </mat-card-content>
    </mat-card>

    <mat-card class="mt-4">
      <mat-card-header>
        <mat-card-title>Orders List</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="orders" class="mat-elevation-z8">
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>ID</th>
            <td mat-cell *matCellDef="let order">{{order.id}}</td>
          </ng-container>

          <ng-container matColumnDef="description">
            <th mat-header-cell *matHeaderCellDef>Description</th>
            <td mat-cell *matCellDef="let order">{{order.description}}</td>
          </ng-container>

          <ng-container matColumnDef="quantite">
            <th mat-header-cell *matHeaderCellDef>Quantity</th>
            <td mat-cell *matCellDef="let order">{{order.quantite}}</td>
          </ng-container>

          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef>Date</th>
            <td mat-cell *matCellDef="let order">{{order.date | date}}</td>
          </ng-container>

          <ng-container matColumnDef="montant">
            <th mat-header-cell *matHeaderCellDef>Amount</th>
            <td mat-cell *matCellDef="let order">{{order.montant}}</td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let order">
              <button mat-icon-button color="primary" (click)="editOrder(order)">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" (click)="deleteOrder(order.id)">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-width: 500px;
      margin: 0 auto;
    }
    .mt-4 {
      margin-top: 2rem;
    }
    table {
      width: 100%;
    }
  `]
})
export class OrdersComponent implements OnInit {
  orderForm: FormGroup;
  orders: Order[] = [];
  displayedColumns: string[] = ['id', 'description', 'quantite', 'date', 'montant', 'actions'];

  constructor(
    private fb: FormBuilder,
    private ordersService: OrdersService,
    private snackBar: MatSnackBar
  ) {
    this.orderForm = this.fb.group({
      description: ['', Validators.required],
      quantite: ['', [Validators.required, Validators.min(1)]],
      date: ['', Validators.required],
      montant: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.ordersService.getOrders().subscribe({
      next: (orders) => this.orders = orders,
      error: (error) => this.showError('Failed to load orders')
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const order = this.orderForm.value;
      this.ordersService.createOrder(order).subscribe({
        next: () => {
          this.loadOrders();
          this.orderForm.reset();
          this.showSuccess('Order created successfully');
        },
        error: (error) => this.showError('Failed to create order')
      });
    }
  }

  editOrder(order: Order): void {
    this.orderForm.patchValue(order);
    // You might want to implement a dialog for editing
  }

  deleteOrder(id: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.ordersService.deleteOrder(id).subscribe({
        next: () => {
          this.loadOrders();
          this.showSuccess('Order deleted successfully');
        },
        error: (error) => this.showError('Failed to delete order')
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
