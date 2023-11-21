import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarComponent } from './car/car.component';
import { MaterialModule } from 'src/app/material.module';
import { CarsFilterComponent } from './cars-filter/cars-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { CarsListComponent } from './cars-list/cars-list/cars-list.component';
import { HomeComponent } from './home/home.component';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
    declarations: [CarComponent, CarsFilterComponent, CarsListComponent, HomeComponent, PaginationComponent],
    imports: [CommonModule, CarsRoutingModule, MaterialModule, ReactiveFormsModule, DataViewModule, ButtonModule, PanelModule, TableModule, MatProgressSpinnerModule]
})
export class CarsModule { }
