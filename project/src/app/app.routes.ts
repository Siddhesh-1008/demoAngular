import { Routes } from '@angular/router';
import { authGuard, roleGuard } from './guards/auth.guard';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CallbackComponent } from './components/callback/callback.component';

export const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  }
];