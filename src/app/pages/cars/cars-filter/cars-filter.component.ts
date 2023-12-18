import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {CarsService} from '../services/cars.service';
import {Car} from '../interface';

@Component({
  selector: 'app-cars-filter',
  templateUrl: './cars-filter.component.html',
  styleUrls: ['./cars-filter.component.scss'],
})
export class CarsFilterComponent {
  recipeForm = this.fb.group({
    brand: [''],
  });

  brandList: string[] = [
    'Ford',
    'Fiat',
    'VW',
    'Peugeot',
    'Renault',
    'Chevrolet',
  ];

  constructor(
    private service: CarsService,
    private fb: FormBuilder
  ) {}

  filterResults() {
    this.service.updateFilter(this.recipeForm.value as Car);
  }

  clearFilter() {
    this.service.clearFilter();
  }
}
