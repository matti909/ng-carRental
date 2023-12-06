import {Component, inject} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Car} from 'src/app/pages/cars/interface';
import {PriceService} from 'src/app/pages/cars/services/price.service';

@Component({
  selector: 'app-g-price-form',
  templateUrl: './g-price-form.component.html',
  styleUrls: ['./g-price-form.component.scss'],
})
export class GPriceFormComponent {
  fb = inject(FormBuilder);
  priceService = inject(PriceService);

  form = this.fb.group({
    price: [0, [Validators.required]],
  });

  submit() {
    const priceValue: number = this.form.get('price')?.value || 0;

    const car: Car = {
      price: priceValue,
    };

    this.priceService.setPriceFormState(car);
  }
}
