import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CarsRoutingModule} from './cars-routing.module';
import {MaterialModule} from 'src/app/material.module';
import {CarsFilterComponent} from './cars-filter/cars-filter.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataViewModule} from 'primeng/dataview';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {CarsListComponent} from './cars-list/cars-list.component';
import {HomeComponent} from './home/home.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CarCreationComponent} from './car-creation/car-creation.component';
import {SharedModule} from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CarsFilterComponent,
    CarsListComponent,
    HomeComponent,
    CarCreationComponent,
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    DataViewModule,
    ButtonModule,
    PanelModule,
    TableModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  exports: [CarsFilterComponent, CarsListComponent],
})
export class CarsModule {}
