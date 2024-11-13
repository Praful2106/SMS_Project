import { Component } from '@angular/core';
import { DashboardService } from '../../services/core/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private dashApi: DashboardService) { }
  ngOnInit(): void {
    this.getStud()
  }
  getStud() {
    this.dashApi.getStudent().subscribe((res: any) => {
      console.log('stud', res)
    })
  }
}
