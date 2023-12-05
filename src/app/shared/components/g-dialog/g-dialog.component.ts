import { Component } from '@angular/core';
import { DialogServices } from '../../services/dialog.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-g-dialog',
  templateUrl: './g-dialog.component.html',
  styleUrls: ['./g-dialog.component.scss']
})
export class GDialogComponent {
  isOpen = false

  constructor(public dialogService: DialogServices) {
    this.dialogService.dialogSubject$
      .getSubject()
      .pipe(takeUntilDestroyed())
      .subscribe((dialogState) => (this.isOpen = dialogState))
  }

  closeDialog() {
    this.isOpen = false
    this.dialogService.dialogSubject$.setSubject(false)
  }
}
