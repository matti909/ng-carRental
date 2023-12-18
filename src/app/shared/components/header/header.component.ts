import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {Router} from '@angular/router';
import {Subject, take, takeUntil} from 'rxjs';
import {AuthState, User} from 'src/app/pages/users/interfaces';
import {AuthService} from 'src/app/pages/users/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: User | null = null;
  title = 'Dashboard';
  opened = false;
  public isLoggedIn: boolean = false;
  public authUser: User | null = null;
  private destroyNotifier$: Subject<boolean> = new Subject<boolean>();

  @ViewChild('sidenav', {static: true}) sidenav!: MatSidenav;

  constructor(
    public router: Router,
    public authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log(window.innerWidth);
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }

    this.authService.authState
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (authState: AuthState) => {
          this.isLoggedIn = authState.isLoggedIn;
          this.authUser = authState.currentUser;
          this.changeDetectorRef.markForCheck();
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next(true);
    this.destroyNotifier$.complete();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }
  isBiggerScreen() {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

  public navigateTo(page: string): void {
    this.router.navigate([page]);
  }

  logOut(): void {
    this.authService.logOut();
    this.router.navigateByUrl('/users/login');
  }
}
