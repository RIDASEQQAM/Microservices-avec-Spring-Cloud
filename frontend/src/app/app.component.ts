import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  template: `
    <div class="app-container">
      <mat-toolbar color="primary">
        <button mat-icon-button (click)="sidenav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <span>Microservices Dashboard</span>
      </mat-toolbar>

      <mat-sidenav-container>
        <mat-sidenav #sidenav mode="side" opened>
          <mat-nav-list>
            <a mat-list-item routerLink="/">
              <mat-icon>home</mat-icon>
              <span>Home</span>
            </a>
            <a mat-list-item routerLink="/products">
              <mat-icon>inventory_2</mat-icon>
              <span>Products</span>
            </a>
            <a mat-list-item routerLink="/commands">
              <mat-icon>shopping_cart</mat-icon>
              <span>Orders</span>
            </a>
            <a mat-list-item routerLink="/status">
              <mat-icon>monitor_heart</mat-icon>
              <span>Service Status</span>
            </a>
            <a mat-list-item routerLink="/config">
              <mat-icon>settings</mat-icon>
              <span>Configuration</span>
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content>
          <div class="content">
            <router-outlet></router-outlet>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    mat-toolbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2;
    }

    mat-sidenav-container {
      flex: 1;
      margin-top: 64px;
      height: calc(100vh - 64px);
    }

    mat-sidenav {
      width: 250px;
      background-color: #f5f5f5;
    }

    .content {
      padding: 20px;
      height: 100%;
      overflow-y: auto;
    }

    mat-nav-list a {
      display: flex;
      align-items: center;
      gap: 12px;
      height: 48px;
    }

    mat-icon {
      margin-right: 8px;
    }

    mat-sidenav-content {
      background-color: #fafafa;
    }
  `]
})
export class AppComponent {
  title = 'frontend';
}
