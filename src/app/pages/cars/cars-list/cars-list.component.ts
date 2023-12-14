import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DialogServices } from 'src/app/shared/services/dialog.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Car } from '../interface';
import { CarsService } from '../services/cars.service';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss'],
})
export class CarsListComponent implements OnInit, AfterViewInit {
  cars$!: Observable<Car[]>;
  filterRecipesAction$ = this.service.filterCarsAction$;
  displayedColumns: string[] = ['brand', 'price', 'picture', 'make', 'actions'];
  dataSource: MatTableDataSource<Car> = new MatTableDataSource<Car>();
  dialogService = inject(DialogServices);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: CarsService,
    private shoppingCartSvc: ShoppingCartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cars$ = combineLatest([
      this.service.cars$,
      this.filterRecipesAction$,
    ]).pipe(
      map(([cars, filter]: [Car[], Car]) => {
        const filteredCars = cars.filter(
          car =>
            car.brand
              ?.toLowerCase()
              .indexOf(filter?.brand?.toLowerCase() ?? '') != -1
        );
        this.dataSource.data = filteredCars;
        return filteredCars;
      }),
      startWith([])
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  add(car: Car): void {
    this.shoppingCartSvc.updateCart(car);
  }

  onButtonClick() {
    this.router.navigate(['/cars/create']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(car: Car) {
    this.dialogService.dialogSubject$.setSubject(true);
    this.dialogService.setSelectedCar(car);
  }
}
