import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject, tap, throwError} from 'rxjs';
import {Car} from '../interface';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private apiUrl = 'http://3.137.176.43/cars';
  cars$ = this.http.get<Car[]>(this.apiUrl);
  private filterCarSubject = new BehaviorSubject<Car>({brand: ''});
  filterCarsAction$ = this.filterCarSubject.asObservable();
  private refreshData = new Subject<void>();

  constructor(private http: HttpClient) {}

  get refreshNeed() {
    return this.refreshData;
  }

  updateFilter(criteria: Car) {
    this.filterCarSubject.next(criteria);
  }

  clearFilter() {
    this.filterCarSubject.next({});
  }

  saveCar(formData: FormData): Observable<Car> {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post<Car>(this.apiUrl, formData, {headers}).pipe(
        tap(() => {
          this.refreshNeed.next();
        })
      );
    } else {
      throw new Error('No se encontró el token de autenticación.');
    }
  }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

  getCar(id: string | number): Observable<Car> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Car>(url);
  }

  updatePriceCar(
    id: string | number | undefined,
    changes: Partial<Car>
  ): Observable<Car> {
    const token = localStorage.getItem('accessToken');
    if (id !== undefined && token) {
      const url = `${this.apiUrl}/${id}`;
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.patch<Car>(url, changes, {headers}).pipe(
        tap(() => {
          this.refreshNeed.next();
        })
      );
    } else {
      return throwError('El ID del coche no está definido.');
    }
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl} + ${id}`);
  }
}
/* updatePriceCar(id: number, data: { price: number | null }): Observable<void> {
      return this.http.patch<void>(`${this.apiUrl}/${id}`, {price});
    } */
