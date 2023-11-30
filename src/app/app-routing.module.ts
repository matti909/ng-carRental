import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './pages/users/auth/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users' },
  {
    path: 'cars',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/cars/cars.module').then(m => m.CarsModule),
  },
  { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) }
  //{ path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
