import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthenticService } from '../authentic.service';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = environment.apiUrl
  constructor(private http: HttpClient,private auth:AuthenticService) { }

  getStudent(): Observable<any> {
    let token=this.auth.getToken()
    const headers = new HttpHeaders({
      'Authorization': `${token}`, // Replace with your actual token retrieval method
      'Content-Type': 'application/json' // Example header
    });
    return this.http.get(`${this.apiUrl}students`,{headers}).pipe(map((res: any) => {
      return res
    }))
  }
}
