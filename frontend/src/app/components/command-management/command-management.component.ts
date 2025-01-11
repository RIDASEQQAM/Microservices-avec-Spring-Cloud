import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { CommandeService } from '../../services/commande.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-command-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  template: `
    <div class="container">
      <h2>Order Management</h2>
      
      <div class="actions">
        <button mat-raised-button color="primary" (click)="openOrderDialog()">
          <mat-icon>add</mat-icon> New Order
        </button>
      </div>

      <table mat-table [dataSource]="orders" class="mat-elevation-z8">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>ID</th>
          <td mat-cell *matCellDef="let order">{{order.id}}</td>
        </ng-container>

        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef>Date</th>
          <td mat-cell *matCellDef="let order">{{order.date | date}}</td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Status</th>
          <td mat-cell *matCellDef="let order">{{order.status}}</td>
        </ng-container>

        <ng-container matColumnDef="totalAmount">
          <th mat-header-cell *matHeaderCellDef>Total Amount</th>
          <td mat-cell *matCellDef="let order">{{order.totalAmount | currency}}</td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let order">
            <button mat-icon-button color="primary" (click)="editOrder(order)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="accent" (click)="addProducts(order)">
              <mat-icon>add_shopping_cart</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="deleteOrder(order.id)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }

    .actions {
      margin-bottom: 20px;
    }

    table {
      width: 100%;
    }

    .mat-column-actions {
      width: 160px;
    }
  `]
})
export class CommandManagementComponent implements OnInit {
  orders: any[] = [];
  displayedColumns: string[] = ['id', 'date', 'status', 'totalAmount', 'actions'];

  constructor(
    private commandeService: CommandeService,
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.commandeService.getAllCommandes().subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (error) => {
        this.snackBar.open('Error loading orders', 'Close', { duration: 3000 });
      }
    });
  }

  openOrderDialog(order?: any) {
    // TODO: Implement order dialog
  }

  editOrder(order: any) {
    this.openOrderDialog(order);
  }

  addProducts(order: any) {
    // TODO: Implement add products dialog
  }

  deleteOrder(id: number) {
    if (confirm('Are you sure you want to delete this order?')) {
      this.commandeService.deleteCommande(id).subscribe({
        next: () => {
          this.snackBar.open('Order deleted successfully', 'Close', { duration: 3000 });
          this.loadOrders();
        },
        error: (error) => {
          this.snackBar.open('Error deleting order', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
