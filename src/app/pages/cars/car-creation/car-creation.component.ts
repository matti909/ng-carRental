// car-creation.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { catchError, concatMap, of, tap } from 'rxjs';
import { CarsService } from '../services/cars.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Car } from '../interface';

@Component({
  selector: 'app-car-creation',
  templateUrl: './car-creation.component.html',
  styleUrls: ['./car-creation.component.scss'],
})
export class CarCreationComponent implements OnInit {
  selectedFile: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private service: CarsService,
    private snackBar: MatSnackBar
  ) {}

  form = this.formBuilder.group({
    brand: [''],
    make: [''],
    year: [''],
    km: [''],
    cm3: [''],
    price: [''],
    picture: ['']
  });

  valueChanges$ = this.form.valueChanges.pipe(
    concatMap((form) => this.service.saveCar(this.buildFormData(form))),
    catchError((errors) => {
      this.showSnackBar('Error saving car. Please try again.');
      return of(errors);
    }),
    tap((result) => this.saveSuccess(result))
  );

  saveSuccess(result: any) {
    console.log('Saved successfully');
    this.showSnackBar('Car saved successfully!');
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

 
onSubmit(): void {
  if (this.form.valid) {
    const formData = this.buildFormData(this.form.value);
    this.service.saveCar(formData).subscribe(
      (result) => this.saveSuccess(result),
      (error) => {
        console.error('Error saving car:', error);
        this.showSnackBar('Error saving car. Please try again.');
      }
    );
  } else {
    this.showSnackBar('Please fill in all required fields.');
  }
}

  private buildFormData(form: any): FormData {
    const formData = new FormData();
    formData.append('brand', form.brand);
    formData.append('make', form.make);
    formData.append('year', form.year);
    formData.append('km', form.km);
    formData.append('cm3', form.cm3);
    formData.append('price', form.price);
    formData.append('picture', this.selectedFile);

    return formData;
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  ngOnInit(): void {}
}
