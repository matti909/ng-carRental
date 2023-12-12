import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {CarsService} from '../services/cars.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Location} from '@angular/common';

@Component({
  selector: 'app-car-creation',
  templateUrl: './car-creation.component.html',
  styleUrls: ['./car-creation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarCreationComponent {
  selectedFile: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private service: CarsService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {}

  form = this.formBuilder.group({
    brand: [''],
    make: [''],
    year: [''],
    km: [''],
    cm3: [''],
    price: [''],
    picture: [''],
  });

  saveSuccess(result: any) {
    console.log('Saved successfully');
    this.showSnackBar('Car saved successfully!');
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  onSaveCar(): void {
    if (this.form.valid) {
      const formData = this.buildFormData(this.form.value);
      this.service.saveCar(formData).subscribe({
        next: result => this.saveSuccess(result),
        error: error => {
          console.error('Error saving car:', error);
          this.showSnackBar('Error saving car. Please try again.');
        },
      });
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

  handleErrors(errors: any) {
    console.error('Error occurred:', errors);
  }

  onBackButtonClick() {
    this.location.back();
  }
}
