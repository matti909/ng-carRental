import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-g-button',
  templateUrl: './g-button.component.html',
  styleUrls: ['./g-button.component.scss'],
})

export class GButtonComponent {
  @Output() clickEvent = new EventEmitter()

  clickButton() {
    this.clickEvent.emit(true)
  }
}

