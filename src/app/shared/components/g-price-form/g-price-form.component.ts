import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild, inject} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Car} from 'src/app/pages/cars/interface';
import {CarsService} from 'src/app/pages/cars/services/cars.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable, Subscription} from 'rxjs';
import {DialogServices} from '../../services/dialog.service';

@Component({
  selector: 'app-g-price-form',
  templateUrl: './g-price-form.component.html',
  styleUrls: ['./g-price-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GPriceFormComponent implements OnInit {
  fb = inject(FormBuilder);
  snacbark = inject(MatSnackBar);
  carService = inject(CarsService);
  carUniqe = inject(DialogServices);
  car!: Observable<Car | null>;
  subscription!: Subscription;
  cdr = inject(ChangeDetectorRef)

  form = this.fb.nonNullable.group({
    price: [0],
  });
  @Input() id!: string;

  ngOnInit() {
    this.car = this.carUniqe.getSelectedCar();

    this.car.subscribe(car => {
      if (car) {
        this.form.patchValue({
          price: car.price || 0,
        });
        this.cdr.markForCheck();
      }
    });
  }

  private showSnackBar(message: string): void {
    this.snacbark.open(message, 'Close', {
      duration: 3000,
    });
  }

  saveSuccess(result: any) {
    this.showSnackBar('Car saved successfully!');
    this.carUniqe.dialogSubject$.setSubject(false);
  }

  onSubmit() {
    this.car.subscribe(car => {
      if (this.form.valid && car) {
        const formData = this.form.getRawValue();
        this.carService.updatePriceCar(car._id, formData).subscribe({
          next: result => {
            this.saveSuccess(result);
          },
          error: (error: any) => {
            console.error('Error update price car:', error);

            if (error.status === 403) {
              const errorMessage = error.error.detail;
              console.log('Error detail:', errorMessage);
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
