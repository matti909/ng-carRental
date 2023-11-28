import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AuthState, User } from '../../users/interfaces';
import { Car } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class CarsService {

  private apiUrl = 'http://localhost:8000/cars';
  cars$ = this.http.get<Car[]>(this.apiUrl);
  private filterCarSubject = new BehaviorSubject<Car>({ brand: '' });
  filterCarsAction$ = this.filterCarSubject.asObservable();

  constructor(private http: HttpClient) { }

  updateFilter(criteria: Car) {
    this.filterCarSubject.next(criteria);
  }

  saveCar(formData: FormData): Observable<Car> {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post<Car>(this.apiUrl, formData, { headers });
    } else {
      throw new Error('No se encontró el token de autenticación.');
    }
  }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

}

