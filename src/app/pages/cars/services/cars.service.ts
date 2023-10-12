import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cars } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private apiUrl = 'http://localhost:8000/cars';
  constructor(private http: HttpClient) {}

  getAllCars(): Observable<Cars[]> {
    return this.http.get<Cars[]>(this.apiUrl);
  }
}
