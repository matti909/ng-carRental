import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from 'src/app/pages/users/interfaces';
import { AuthService } from 'src/app/pages/users/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User | null = null;
  title = 'Dashboard'
  opened = false

  constructor(
    public router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.authState.pipe(take(1)).subscribe(authState => {
      this.user = authState.currentUser;
    });
  }

  public navigateTo(page: string): void {
    this.router.navigate([page]);
  }

}
