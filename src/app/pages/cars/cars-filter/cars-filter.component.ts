import {Component} from '@angular/core';
import {CarsService} from '../services/cars.service';
import {FormBuilder} from '@angular/forms';

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
