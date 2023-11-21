import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Car } from '../interface';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarComponent {
  @Input() car!: Car;

  @Output() addToCar = new EventEmitter<Car>();

  onClick(): void {
    this.addToCar.emit(this.car);
  }
}
