import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {CartComponent} from './components/cart/cart.component';
import {ShoppingCartService} from './services/shopping-cart.service';
import {MaterialModule} from '../material.module';
import {RouterModule} from '@angular/router';
import {GButtonComponent} from './components/g-button/g-button.component';
import { GDialogComponent } from './components/g-dialog/g-dialog.component';
import { DialogServices } from './services/dialog.service';
import { GPriceFormComponent } from './components/g-price-form/g-price-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, CartComponent, GButtonComponent, GDialogComponent, GPriceFormComponent],
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [HeaderComponent, GButtonComponent, GDialogComponent, GPriceFormComponent],
  providers: [ShoppingCartService, DialogServices],
})
export class SharedModule {}
