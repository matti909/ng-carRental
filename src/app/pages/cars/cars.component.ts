import { Component, OnInit } from '@angular/core';
import { CarsService } from './services/cars.service';
// import { tap } from 'rxjs';
import { Cars } from './interface';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent implements OnInit {
  cars!: Cars[];

  constructor(
    private carsSvc: CarsService,
    private shoppingCartSvc: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.carsSvc.getAllCars().subscribe(result => {
      this.cars = result;
    });
  }

  add(car: Cars): void {
    console.log('Add to Cart', car);
    this.shoppingCartSvc.updateCart(car);
  }
}
