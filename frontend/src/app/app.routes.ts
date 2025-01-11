import { Routes } from '@angular/router';
import { HomeDashboardComponent } from './components/home-dashboard/home-dashboard.component';
import { CommandManagementComponent } from './components/command-management/command-management.component';
import { ServiceMonitoringComponent } from './components/service-monitoring/service-monitoring.component';
import { ConfigManagementComponent } from './components/config-management/config-management.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';

export const routes: Routes = [
  { path: '', component: HomeDashboardComponent },
  { path: 'commands', component: CommandManagementComponent },
  { path: 'products', component: ProductManagementComponent },
  { path: 'status', component: ServiceMonitoringComponent },
  { path: 'config', component: ConfigManagementComponent },
  { path: '**', redirectTo: '' }
];
