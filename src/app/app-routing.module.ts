import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'cars' },
  {
    path: 'cars',
    loadChildren: () =>
      import('./pages/cars/cars.module').then(m => m.CarsModule),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./pages/checkout/checkout.module').then(m => m.CheckoutModule),
  },
  {
    path: 'users',
    loadChildren: () => 
      import('./pages/users/users.module').then(m => m.UsersModule)
  }
  //{ path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
