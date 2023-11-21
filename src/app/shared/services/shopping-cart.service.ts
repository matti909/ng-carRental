import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Car } from 'src/app/pages/cars/interface';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
  cars: Car[] = [];

  private cartSubject = new Subject<Car[]>();
  private totalSubject = new Subject<number>();
  private quantitySubject = new Subject<number>();

  get cartActions$(): Observable<Car[]> {
    console.log('Cart updated:', this.cars);
    return this.cartSubject.asObservable();
  }
  
  get totalActions$(): Observable<number> {
    console.log('Total updated:', this.totalSubject);
    return this.totalSubject.asObservable();
  }
  
  get quantityActions$(): Observable<number> {
    console.log('Quantity updated:', this.quantitySubject);
    return this.quantitySubject.asObservable();
  }
  

  updateCart(car: Car): void {
    this.addToCart(car);
    this.quantityCars();
    this.calcTotal();
  }

  private addToCart(car: Car): void {
    this.cars.push(car);
    this.cartSubject.next(this.cars);
  }

  private quantityCars(): void {
    const quantity = this.cars.length;
    this.quantitySubject.next(quantity);
  }

  private calcTotal(): void {
    const total = this.cars.reduce((acc, car) => acc + (car.price ?? 0), 0);
    this.totalSubject.next(total);
  }
  
}
