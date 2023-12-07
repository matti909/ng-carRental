import {Component, Input, OnInit, inject, signal} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Car} from 'src/app/pages/cars/interface';
import {CarsService} from 'src/app/pages/cars/services/cars.service';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable, of} from 'rxjs';
import {DialogServices} from '../../services/dialog.service';

@Component({
  selector: 'app-g-price-form',
  templateUrl: './g-price-form.component.html',
  styleUrls: ['./g-price-form.component.scss'],
})
export class GPriceFormComponent implements OnInit {
  private location = inject(Location);
  fb = inject(FormBuilder);
  snacbark = inject(MatSnackBar);
  carService = inject(CarsService);
  carUniqe = inject(DialogServices);
  car!: Observable<Car | null>;

  form = this.fb.nonNullable.group({
    price: [0],
  });
  @Input() id!: string;

  ngOnInit() {
    this.car = this.carUniqe.getSelectedCar();
  }

  getCar(productId: string) {
    this.carService.getCar(productId).subscribe(data => {
      this.car = of(data);
      this.form.patchValue(data);
    });
  }

  private showSnackBar(message: string): void {
    this.snacbark.open(message, 'Close', {
      duration: 3000,
    });
  }

  saveSuccess(result: any) {
    console.log('Saved successfully');
    this.showSnackBar('Car saved successfully!');
  }

  onSubmit() {
    console.log('Formulario válido:', this.form.valid);
  
    if (!this.car) {
      console.error('this.car is undefined', this.car);
      return;
    }
  
    this.car.subscribe(car => {
      console.log('Valor de car:', car);
  
      if (this.form.valid && car) {
        const formData = this.form.getRawValue();
        this.carService.updatePriceCar(car._id, formData).subscribe({
          next: result => {
            this.saveSuccess(result);
            // Refresca la página después de una actualización exitosa
            window.location.reload();
          },
          error: (error: any) => {
            console.error('Error update price car:', error);
  
            if (error.status === 403) {
              const errorMessage = error.error.detail;
              console.log('Error detail:', errorMessage);
  
              // Puedes mostrar el mensaje en tu interfaz de usuario o tomar alguna acción adicional.
              this.showSnackBar('Authentication Error: ' + errorMessage);
            } else {
              this.showSnackBar('Error updating car. Please try again.');
            }
          },
        });
      } else {
        console.log('Formulario no válido o car es null/undefined');
        this.showSnackBar('Please fill in all required fields.');
      }
    });
  }
  
}
