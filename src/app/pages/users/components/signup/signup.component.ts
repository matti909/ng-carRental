import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subscription} from 'rxjs';
import {SignupResponse} from '../../interfaces';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    password2: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    role: new FormControl(''),
  });

  errorMessage: string | null = '';
  private registerSubscription: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }

  submit() {
    const {username, email, password, password2, role} = this.form.value;
    if (password !== password2) {
      this.errorMessage = 'Passwords mismatch';
      return;
    }
    if (!this.form.valid) {
      this.errorMessage = 'Please enter valid information';
      return;
    }

    this.registerSubscription = this.authService
      .register(username, email, password, role)
      .subscribe({
        next: (result: SignupResponse | null | undefined) => {
          this.snackBar.open('Signup Success!', 'Ok', {
            duration: 5 * 1000,
          });
          this.router.navigateByUrl('/users/login');
        },
        error: err => {
          console.error(err.error);
          this.errorMessage = err.message;
          this.snackBar.open(err.message, 'Ok', {
            duration: 5 * 1000,
          });
        },
      });
  }
}
