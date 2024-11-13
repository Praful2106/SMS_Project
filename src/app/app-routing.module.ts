import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

const routes: Routes = [
  // Redirect empty path to 'dashboard'
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // Route for authentication (login/signup)
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },  // Lazy-load AuthModule

  // Layout component with child routes
  { 
    path: '', 
    component: LayoutComponent, 
    children: [
      { path: '', loadChildren: () => import('./core/core.module').then(m => m.CoreModule) }  // Lazy-load CoreModule for dashboard
    ]
  },

  // Wildcard route for undefined routes, redirecting to dashboard
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
