import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarsComponent } from './cars.component';
import { CarComponent } from './car/car.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [CarsComponent, CarComponent],
  imports: [CommonModule, CarsRoutingModule, MaterialModule],
})
export class CarsModule {}
