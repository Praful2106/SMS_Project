import { Injectable } from '@angular/core';
import{environment} from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticService {
private readonly apiUrl=environment.apiUrl
private currentUserSubject: BehaviorSubject<any>;
public currentUser: Observable<any>;
  constructor( private http:HttpClient) {
    const storedUser = localStorage.getItem('sms-token');
    
    // Initialize with null if no data is found
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
   }

login(data:any):Observable<any>{
  return this.http.post(`${this.apiUrl}login`,data).pipe(tap((res:any)=>{
    localStorage.setItem('sms-token',JSON.stringify(res.token));
    this.currentUserSubject.next(res.token);
  }))
}
logout():void{
localStorage.removeItem('sms-token');
this.currentUserSubject.next(null)
}

public getToken(): string | null {
  const currentUser = this.currentUserSubject.value;
  return currentUser || null;
}
register(data:any):Observable<any>{
  return this.http.post(`${this.apiUrl}register`,data).pipe(tap((res:any)=>{
    return res
  }))
}
}
