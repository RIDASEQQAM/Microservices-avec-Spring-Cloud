import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommandeService } from '../../services/commande.service';
import { MonitoringService } from '../../services/monitoring.service';
import { firstValueFrom } from 'rxjs';

interface DashboardStats {
  totalOrders: number;
  servicesHealth: boolean;
}

interface Command {
  // Add properties of the Command interface
}

interface ServiceHealth {
  status: string;
}

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule
  ],
  template: `
    <div class="dashboard-container">
      <h1>System Dashboard</h1>
      
      <mat-grid-list cols="2" rowHeight="200px" gutterSize="16px">
        <mat-grid-tile>
          <mat-card class="dashboard-card">
            <mat-card-header>
              <mat-icon mat-card-avatar>shopping_cart</mat-icon>
              <mat-card-title>Orders</mat-card-title>
              <mat-card-subtitle>Total Orders</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="stat-value">{{stats.totalOrders}}</div>
            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button color="primary" routerLink="/commands">
                <mat-icon>arrow_forward</mat-icon>
                View Orders
              </button>
            </mat-card-actions>
          </mat-card>
        </mat-grid-tile>

        <mat-grid-tile>
          <mat-card class="dashboard-card">
            <mat-card-header>
              <mat-icon mat-card-avatar>monitor_heart</mat-icon>
              <mat-card-title>System Health</mat-card-title>
              <mat-card-subtitle>Services Status</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="stat-value" [class.status-up]="stats.servicesHealth" [class.status-down]="!stats.servicesHealth">
                {{stats.servicesHealth ? 'UP' : 'DOWN'}}
              </div>
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
              <mat-card-subtitle>System Settings</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p>Manage system configuration and settings</p>
            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button color="primary" routerLink="/config">
                <mat-icon>arrow_forward</mat-icon>
                View Config
              </button>
            </mat-card-actions>
          </mat-card>
        </mat-grid-tile>

        <mat-grid-tile>
          <mat-card class="dashboard-card">
            <mat-card-header>
              <mat-icon mat-card-avatar>help</mat-icon>
              <mat-card-title>Documentation</mat-card-title>
              <mat-card-subtitle>System Guide</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p>View system documentation and guides</p>
            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button color="primary" routerLink="/docs">
                <mat-icon>arrow_forward</mat-icon>
                View Docs
              </button>
            </mat-card-actions>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
    }

    h1 {
      margin-bottom: 32px;
      color: #1976d2;
      font-size: 2em;
    }

    .dashboard-card {
      width: 90%;
      height: 90%;
      display: flex;
      flex-direction: column;
    }

    mat-card-content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stat-value {
      font-size: 2em;
      font-weight: bold;
      text-align: center;
    }

    mat-card-actions {
      display: flex;
      justify-content: flex-end;
      padding: 8px;
    }

    .status-up {
      color: #4caf50;
    }

    .status-down {
      color: #f44336;
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
export class HomeDashboardComponent implements OnInit {
  stats: DashboardStats = {
    totalOrders: 0,
    servicesHealth: false
  };

  constructor(
    private commandeService: CommandeService,
    private monitoringService: MonitoringService
  ) {}

  async ngOnInit() {
    try {
      const orders: Command[] = await firstValueFrom(this.commandeService.getAllCommandes());
      const health: boolean = await this.monitoringService.checkServiceHealth('commandes');
      
      this.stats = {
        totalOrders: orders.length,
        servicesHealth: health
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  }
}
