import {Component, inject} from '@angular/core';
import { PriceService } from './pages/cars/services/price.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  priceService = inject(PriceService)
  priceValue = this.priceService.getPriceFormState()
  title = 'Ng-car-rental';
}
