import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { SignInData } from 'src/app/models/sigin.model';
import { UserResponse } from 'src/app/shared/user.response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly mockedUser = new SignInData(
    'sduprogrammer9@gmail.com',
    'pass123'
  );
  isAuthenticated = false;

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private router: Router, private http: HttpClient) {
    const token = localStorage.getItem('authToken');
    this._isLoggedIn$.next(!!token);
  }

  authenticate(signInData: SignInData): boolean {
    if (this.checkCredentials(signInData)) {
      this.isAuthenticated = true;
      this.router.navigate(['users']);
      return true;
    }
    this.isAuthenticated = false;
    return false;
  }

  authenticate01(signInData: SignInData) {
    return this.login(signInData).pipe(
      tap((response: any) => {
        //console.log(response);
        this._isLoggedIn$.next(true);
        localStorage.setItem('authToken', response.data);
      })
      /*catchError(
        (error: HttpErrorResponse): Observable<any> => {
            if (error.status === 404) {
                return of(null); // or any other stream like of('') etc.
            }
            return throwError(() => new Error());
        },
      ),*/
    );
  }

  private login(signInData: SignInData): Observable<UserResponse> {
    return this.http.post<UserResponse>(
      environment.baseApiUrl + '/api/auth/login',
      signInData
    );
  }

  private checkCredentials(signInData: SignInData): boolean {
    return (
      this.checkEmail(signInData.getEmail()) &&
      this.checkPassword(signInData.getPassword())
    );
  }

  private checkEmail(email: string): boolean {
    return email === this.mockedUser.getEmail();
  }

  private checkPassword(password: string): boolean {
    return password === this.mockedUser.getPassword();
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('authToken');
    this._isLoggedIn$.next(false);
    this.router.navigate(['']);
  }
}
