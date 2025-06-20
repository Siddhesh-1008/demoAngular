import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <nav>
        <h1>Dashboard</h1>
        <div class="user-info">
          <span>Welcome, {{ (auth.user$ | async)?.name }}</span>
          <button (click)="auth.logout()">Logout</button>
        </div>
      </nav>
      <div class="content">
        <div *ngIf="auth.getRoles() | async as roles">
          <h2>Your Roles:</h2>
          <ul>
            <li *ngFor="let role of roles">{{ role }}</li>
          </ul>
        </div>
        <div class="role-specific-content">
          <div *ngIf="auth.hasRole('admin') | async">
            <h3>Admin Content</h3>
            <p>This content is only visible to administrators.</p>
          </div>
          <div *ngIf="auth.hasRole('user') | async">
            <h3>User Content</h3>
            <p>This content is visible to regular users.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
    }
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      background-color: #f5f5f5;
      margin-bottom: 20px;
    }
    .user-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    button {
      padding: 8px 16px;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .content {
      padding: 20px;
      background-color: white;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class DashboardComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit() {
    // Additional initialization if needed
  }
}