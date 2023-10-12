import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Cars } from 'src/app/pages/cars/interface';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
  cars: Cars[] = [];

  private cartSubject = new Subject<Cars[]>();
  private totalSubject = new Subject<number>();
  private quantitySubject = new Subject<number>();

  get cartActions$(): Observable<Cars[]> {
    return this.cartSubject.asObservable();
  }

  get totalActions$(): Observable<number> {
    return this.totalSubject.asObservable();
  }

  get quantityActions$(): Observable<number> {
    return this.quantitySubject.asObservable();
  }

  updateCart(car: Cars): void {
    this.addToCart(car);
    this.calTotal();
    this.quantityCars();
  }

  private addToCart(car: Cars): void {
    this.cars.push(car);
    this.cartSubject.next(this.cars);
  }

  private quantityCars(): void {
    const quantity = this.cars.length;
    this.quantitySubject.next(quantity);
  }

  private calTotal(): void {
    const total = this.cars.reduce((acc, stock) => (acc += stock.price), 0);
    this.totalSubject.next(total);
  }
}
