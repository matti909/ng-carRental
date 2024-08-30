import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = 'https://fastapi-tapeqg7idq-uc.a.run.app/';
  private apiUrl = `${this.baseUrl}users`;

  users$ = this.http.get<User[]>(this.apiUrl);

  constructor(private http: HttpClient) {}

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
