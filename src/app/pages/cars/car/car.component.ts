import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Cars } from '../interface';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarComponent {
  @Input() car!: Cars;

  @Output() addToCar = new EventEmitter<Cars>();

  onClick(): void {
    this.addToCar.emit(this.car);
  }
}
