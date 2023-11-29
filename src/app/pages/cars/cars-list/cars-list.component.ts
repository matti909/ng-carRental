import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: CarsService, private shoppingCartSvc: ShoppingCartService) { }

  ngOnInit(): void {
    this.cars$ = combineLatest([this.service.cars$, this.filterRecipesAction$]).pipe(
      map(([cars, filter]: [Car[], Car]) => {
        const filteredCars = cars.filter(car => car.brand?.toLowerCase().indexOf(filter?.brand?.toLowerCase() ??  '') != -1);
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
    console.log('Add to Cart', car);
    this.shoppingCartSvc.updateCart(car);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}