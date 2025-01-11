import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MonitoringService } from '../../services/monitoring.service';

interface ServiceStatus {
  name: string;
  status: boolean;
  metrics?: any;
}

@Component({
  selector: 'app-service-monitoring',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  template: `
    <div class="monitoring-container">
      <mat-card class="status-card">
        <mat-card-header>
          <mat-card-title>Service Health Status</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="service-grid">
            <div *ngFor="let service of services" class="service-item">
              <mat-card>
                <mat-card-header>
                  <mat-card-title>{{service.name}}</mat-card-title>
                  <mat-card-subtitle>
                    <span [class]="service.status ? 'status-up' : 'status-down'">
                      {{service.status ? 'UP' : 'DOWN'}}
                    </span>
                  </mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <div *ngIf="service.metrics" class="metrics">
                    <div class="metric-item">
                      <span class="metric-label">Requests</span>
                      <span class="metric-value">{{service.metrics.requests || 0}}</span>
                    </div>
                    <mat-divider></mat-divider>
                    <div class="metric-item">
                      <span class="metric-label">Response Time</span>
                      <span class="metric-value">{{service.metrics.responseTime || 0}}ms</span>
                    </div>
                    <mat-divider></mat-divider>
                    <div class="metric-item">
                      <span class="metric-label">Error Rate</span>
                      <span class="metric-value">{{service.metrics.errorRate || 0}}%</span>
                    </div>
                  </div>
                  <div *ngIf="!service.metrics" class="loading-metrics">
                    <mat-spinner diameter="30"></mat-spinner>
                    <span>Loading metrics...</span>
                  </div>
                </mat-card-content>
                <mat-card-actions>
                  <button mat-button color="primary" (click)="refreshService(service)">
                    <mat-icon>refresh</mat-icon>
                    Refresh
                  </button>
                  <button mat-button color="accent" (click)="simulateTimeout(service)">
                    <mat-icon>timer</mat-icon>
                    Simulate Timeout
                  </button>
                </mat-card-actions>
              </mat-card>
            </div>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="refreshAll()">
            <mat-icon>refresh</mat-icon>
            Refresh All
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .monitoring-container {
      padding: 20px;
    }

    .status-card {
      margin-bottom: 20px;
    }

    .service-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .service-item mat-card {
      height: 100%;
    }

    .status-up {
      color: #28a745;
      font-weight: bold;
    }

    .status-down {
      color: #dc3545;
      font-weight: bold;
    }

    .metrics {
      margin: 20px 0;
    }

    .metric-item {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
    }

    .metric-label {
      color: rgba(0, 0, 0, 0.6);
    }

    .metric-value {
      font-weight: bold;
    }

    .loading-metrics {
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: center;
      padding: 20px;
      color: rgba(0, 0, 0, 0.6);
    }

    mat-card-actions {
      display: flex;
      justify-content: flex-end;
      padding: 8px;
    }

    button mat-icon {
      margin-right: 8px;
    }
  `]
})
export class ServiceMonitoringComponent implements OnInit {
  services: ServiceStatus[] = [
    { name: 'commandes', status: false },
    { name: 'products', status: false },
    { name: 'inventory', status: false }
  ];

  constructor(private monitoringService: MonitoringService) {}

  ngOnInit() {
    this.refreshAll();
  }

  async refreshService(service: ServiceStatus) {
    try {
      service.status = await this.monitoringService.checkServiceHealth(service.name);
      const metrics = await this.monitoringService.getServiceMetrics(service.name);
      service.metrics = {
        requests: metrics?.http?.requests || 0,
        responseTime: metrics?.http?.responseTime || 0,
        errorRate: metrics?.http?.errorRate || 0
      };
    } catch (error) {
      console.error(`Error refreshing service ${service.name}:`, error);
      service.status = false;
      service.metrics = null;
    }
  }

  async refreshAll() {
    for (const service of this.services) {
      await this.refreshService(service);
    }
  }

  async simulateTimeout(service: ServiceStatus) {
    try {
      await this.monitoringService.simulateTimeout();
    } catch (error) {
      console.error('Error simulating timeout:', error);
    } finally {
      await this.refreshService(service);
    }
  }
}
