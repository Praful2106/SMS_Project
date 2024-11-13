import { Injectable } from '@angular/core';
import  {environment} from '../../environments/environment.prod'
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CoursesService {
private apiUrl=environment.apiUrl
  constructor(private http:HttpClient) { }

getCourses():Observable<any>{
  return this.http.get(`${this.apiUrl}courses`).pipe(map((res: any) => {
    return res;
  }));
}
}
