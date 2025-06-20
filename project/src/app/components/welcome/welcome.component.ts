import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="welcome-container">
      <h1>Welcome to Our Application</h1>
      <p>Please log in to continue</p>
      <button (click)="auth.login()" *ngIf="!(auth.isAuthenticated$ | async)">
        Log In
      </button>
    </div>
  `,
  styles: [`
    .welcome-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #0066cc;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0052a3;
    }
  `]
})
export class WelcomeComponent {
  constructor(public auth: AuthService) {}
}