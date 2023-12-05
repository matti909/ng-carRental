import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoginResponse} from '../../interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  errorMessage = '';
  private loginSubscription: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  submit() {
    const {email, password} = this.form.value;
    if (!this.form.valid) {
      this.errorMessage = 'Please enter valid email and password';
      return;
    }
    this.loginSubscription = this.authService.login(email, password).subscribe({
      next: (result: LoginResponse | null | undefined) => {
        if (result) {
          //const savedUserId = result.user.email;
          this.snackBar.open('Login Success!', 'Ok', {
            duration: 5 * 1000,
          });
          this.router.navigateByUrl('/cars');
        }
      },
      error: err => {
        console.error(err.message);
        this.snackBar.open(err.message, 'Ok', {
          duration: 5 * 1000,
        });
      },
    });
  }
}
