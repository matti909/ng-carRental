import { Injectable } from '@angular/core';
import { SubjectManager } from '../utils/subject-manager.util';
import { Car } from 'src/app/pages/cars/interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogServices {
  dialogSubject$ = new SubjectManager();
  private selectedCar = new BehaviorSubject<Car | null>(null);

  getSelectedCar() {
    return this.selectedCar;
  }

  setSelectedCar(car: Car | null) {
    this.selectedCar.next(car)
  }
}
