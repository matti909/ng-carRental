import { Component, OnInit } from '@angular/core';
import { CarsService } from '../services/cars.service';
import { FormBuilder } from '@angular/forms';

import { Car } from '../interface';

@Component({
  selector: 'app-cars-filter',
  templateUrl: './cars-filter.component.html',
  styleUrls: ['./cars-filter.component.scss']
})
export class CarsFilterComponent implements OnInit {

  recipeForm = this.fb.group({
    brand: ['']
  });

  constructor(private service: CarsService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  filterResults() {
    this.service.updateFilter(this.recipeForm.value as Car);
  }

  clearFilter() {
  }


}
