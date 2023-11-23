import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = 'Dashboard'
  opened = false

  constructor(public router: Router) { }

  public navigateTo(page: string): void {
    this.router.navigate([page]);
  }

}
