import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }
}

