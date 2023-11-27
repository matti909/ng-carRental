import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/users';

  constructor(
    private http: HttpClient
  ) { }

  login(
    email: string,
    password: string): Observable<LoginResponse | null | undefined> {
    const body = { email, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, body);
  }
}
