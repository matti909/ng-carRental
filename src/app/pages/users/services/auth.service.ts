import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, catchError, map, of, tap} from 'rxjs';
import {AuthState, LoginResponse, SignupResponse, User} from '../interfaces';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  ACCESS_TOKEN = 'accessToken';
  AUTH_USER = 'authUser';
  authState!: Observable<AuthState>;
  isLoggedInAsync!: Observable<boolean>;
  private readonly authSubject!: BehaviorSubject<AuthState>;

  private apiUrl = 'http://3.137.176.43/users';

  constructor(private http: HttpClient) {
    const localToken = this.getLocalToken();
    let isLoggedIn = false;
    if (localToken) {
      isLoggedIn = this.tokenExists() && !this.tokenExpired(localToken);
    }
    this.authSubject = new BehaviorSubject<AuthState>({
      isLoggedIn: isLoggedIn,
      currentUser: this.getLocalUser(),
      accessToken: localToken,
    });
    this.authState = this.authSubject.asObservable();
    this.isLoggedInAsync = this.authState.pipe(map(state => state.isLoggedIn));
  }

  get isLoggedIn(): boolean {
    return this.authSubject.getValue().isLoggedIn;
  }
  get authUser(): User | null {
    return this.authSubject.getValue().currentUser;
  }

  getLocalToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  storeUser(user: User): void {
    localStorage.setItem(this.AUTH_USER, JSON.stringify(user));
  }

  private getLocalUser(): User | null {
    return JSON.parse(localStorage.getItem(this.AUTH_USER) as string) ?? null;
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.ACCESS_TOKEN, token);
  }

  private tokenExists(): boolean {
    return !!localStorage.getItem(this.ACCESS_TOKEN);
  }

  private tokenExpired(token: string): boolean {
    const tokenObj = JSON.parse(atob(token.split('.')[1]));
    return Date.now() > tokenObj.exp * 1000;
  }

  private updateAuthState(token: string, user: User) {
    this.storeToken(token);
    this.storeUser(user);
    this.authSubject.next({
      isLoggedIn: true,
      currentUser: user,
      accessToken: token,
    });
  }

  private resetAuthState() {
    this.authSubject.next({
      isLoggedIn: false,
      currentUser: null,
      accessToken: null,
    });
  }

  login(
    email: string,
    password: string
  ): Observable<LoginResponse | null | undefined> {
    const body = {email, password};
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, body).pipe(
      map((response: LoginResponse) => {
        const {token, user} = response;
        this.updateAuthState(token, user);
        return response;
      }),
      catchError(error => {
        console.error('Error logging in:', error);
        this.resetAuthState();
        return of(null);
      })
    );
  }

  register(
    username: string,
    email: string,
    password: string,
    role: string
  ): Observable<SignupResponse | null | undefined> {
    const body1 = {username, email, password, role};
    return this.http
      .post<SignupResponse>(`${this.apiUrl}/register`, body1)
      .pipe(
        map(result => result),
        tap({
          next: (result: SignupResponse | null | undefined) => {
            if (result?.username) {
              console.log('success register');
            }
          },
          error: err => {
            console.error(err);
            this.resetAuthState();
          },
        })
      );
  }

  logOut(): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.AUTH_USER);
    this.resetAuthState();
  }
}
