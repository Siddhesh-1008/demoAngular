import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard1',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <h1>Admin Dashboard</h1>
      <div *ngIf="auth.user$ | async as user">
        <p>Welcome, {{ user.name }}</p>
        <p>Email: {{ user.email }}</p>
      </div>
      <button (click)="logout()">Logout</button>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 20px;
    }
  `]
})
export class Dashboard1Component {
  constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }
}