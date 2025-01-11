import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule
  ],
  template: `
    <div class="home-container">
      <h1>Welcome to Product Management System</h1>
      
      <mat-grid-list cols="2" rowHeight="300px" gutterSize="16px">
        <mat-grid-tile>
          <mat-card class="dashboard-card">
            <mat-card-header>
              <mat-icon mat-card-avatar>inventory_2</mat-icon>
              <mat-card-title>Products</mat-card-title>
              <mat-card-subtitle>Manage your product catalog</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p>Total Products: {{ totalProducts }}</p>
              <p>Manage your product inventory, prices, and details.</p>
            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button color="primary" routerLink="/products">
                <mat-icon>arrow_forward</mat-icon>
                Go to Products
              </button>
            </mat-card-actions>
          </mat-card>
        </mat-grid-tile>

        <mat-grid-tile>
          <mat-card class="dashboard-card">
            <mat-card-header>
              <mat-icon mat-card-avatar>shopping_cart</mat-icon>
              <mat-card-title>Orders</mat-card-title>
              <mat-card-subtitle>View and manage orders</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p>Track and manage customer orders.</p>
            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button color="primary" routerLink="/commands">
                <mat-icon>arrow_forward</mat-icon>
                Go to Orders
              </button>
            </mat-card-actions>
          </mat-card>
        </mat-grid-tile>

        <mat-grid-tile>
          <mat-card class="dashboard-card">
            <mat-card-header>
              <mat-icon mat-card-avatar>monitor_heart</mat-icon>
              <mat-card-title>Service Status</mat-card-title>
              <mat-card-subtitle>Monitor system health</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p>Monitor the health and status of all microservices.</p>
            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button color="primary" routerLink="/status">
                <mat-icon>arrow_forward</mat-icon>
                View Status
              </button>
            </mat-card-actions>
          </mat-card>
        </mat-grid-tile>

        <mat-grid-tile>
          <mat-card class="dashboard-card">
            <mat-card-header>
              <mat-icon mat-card-avatar>settings</mat-icon>
              <mat-card-title>Configuration</mat-card-title>
              <mat-card-subtitle>System settings</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p>Manage system configuration and settings.</p>
            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button color="primary" routerLink="/config">
                <mat-icon>arrow_forward</mat-icon>
                View Config
              </button>
            </mat-card-actions>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 20px;
    }

    h1 {
      margin-bottom: 32px;
      color: #1976d2;
    }

    .dashboard-card {
      width: 90%;
      height: 90%;
      display: flex;
      flex-direction: column;
    }

    mat-card-content {
      flex: 1;
      padding: 16px;
    }

    mat-card-actions {
      padding: 16px;
      display: flex;
      justify-content: flex-end;
    }

    mat-icon {
      margin-right: 8px;
    }

    button mat-icon {
      font-size: 18px;
      height: 18px;
      width: 18px;
    }
  `]
})
export class HomeComponent implements OnInit {
  totalProducts: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.totalProducts = products.length;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.totalProducts = 0;
      }
    });
  }
}
