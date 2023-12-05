import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CarCreationComponent} from './car-creation/car-creation.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'create', component: CarCreationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarsRoutingModule {}
