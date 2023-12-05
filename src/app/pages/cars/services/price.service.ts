import { Injectable, signal } from '@angular/core';
import { Car } from '../interface';

export const EmptyPriceState: Car = {
  price: 0
}

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  private priceformState = signal(EmptyPriceState)

  getPriceFormState() {
    return this.priceformState;
  }

  setPriceFormState(car: Car) {
    this.priceformState.set(car)
  }
}
