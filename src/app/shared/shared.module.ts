import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { ShoppingCartService } from './services/shopping-cart.service';
import { CarsModule } from '../pages/cars/cars.module';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HeaderComponent, CartComponent],
  imports: [CommonModule, CarsModule, MaterialModule, RouterModule],
  exports: [HeaderComponent],
  providers: [ShoppingCartService]
})
export class SharedModule {}
