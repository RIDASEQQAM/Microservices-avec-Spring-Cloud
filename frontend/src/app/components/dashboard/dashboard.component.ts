import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ConfigService } from '../../services/config.service';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule
  ],
  template: `
    <div class="dashboard">
      <mat-card>
        <mat-card-header>
          <mat-card-title>System Status</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="status-indicator" [class.up]="isHealthy" [class.down]="!isHealthy">
            {{ isHealthy ? 'UP' : 'DOWN' }}
          </div>
          <p>Last checked: {{ lastChecked | date:'medium' }}</p>
        </mat-card-content>
      </mat-card>

      <mat-card class="mt-4">
        <mat-card-header>
          <mat-card-title>Recent Orders</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="recentOrders" class="mat-elevation-z8">
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>ID</th>
              <td mat-cell *matCellDef="let order">{{order.id}}</td>
            </ng-container>

            <ng-container matColumnDef="description">
              <th mat-header-cell *matHeaderCellDef>Description</th>
              <td mat-cell *matCellDef="let order">{{order.description}}</td>
            </ng-container>

            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Date</th>
              <td mat-cell *matCellDef="let order">{{order.date | date}}</td>
            </ng-container>

            <ng-container matColumnDef="montant">
              <th mat-header-cell *matHeaderCellDef>Amount</th>
              <td mat-cell *matCellDef="let order">{{order.montant}}</td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .dashboard {
      max-width: 1200px;
      margin: 0 auto;
    }
    .status-indicator {
      font-size: 24px;
      font-weight: bold;
      padding: 16px;
      border-radius: 4px;
      text-align: center;
      margin: 16px 0;
    }
    .up {
      background-color: #4caf50;
      color: white;
    }
    .down {
      background-color: #f44336;
      color: white;
    }
    .mt-4 {
      margin-top: 2rem;
    }
    table {
      width: 100%;
    }
  `]
})
export class DashboardComponent implements OnInit {
  isHealthy = false;
  lastChecked = new Date();
  recentOrders: Order[] = [];
  displayedColumns: string[] = ['id', 'description', 'date', 'montant'];

  constructor(
    private configService: ConfigService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.checkHealth();
    this.loadRecentOrders();
    // Check health every 30 seconds
    setInterval(() => this.checkHealth(), 30000);
  }

  private checkHealth(): void {
    this.configService.getHealth().subscribe({
      next: (response) => {
        this.isHealthy = response.status === 'UP';
        this.lastChecked = new Date();
      },
      error: () => {
        this.isHealthy = false;
        this.lastChecked = new Date();
      }
    });
  }

  private loadRecentOrders(): void {
    this.ordersService.getOrders().subscribe({
      next: (orders) => {
        // Sort by date and get the 10 most recent orders
        this.recentOrders = orders
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 10);
      }
    });
  }
}
