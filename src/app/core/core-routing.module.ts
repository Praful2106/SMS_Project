import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {guardGuard} from '../auth/guard.guard'
const routes: Routes = [
  {path:"dashboard",component:DashboardComponent,canActivate:[guardGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
