import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from '../interfaces';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:8000/users';
  users$ = this.http.get<User[]>(this.apiUrl);

  constructor(private http: HttpClient) { }

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
