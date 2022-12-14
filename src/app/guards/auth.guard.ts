import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /**
   *
   */
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    /*if (this.authService.isAuthenticated) {
      return true;
    }
    this.router.navigate(['']);
    return false;*/
    return this.authService.isLoggedIn$.pipe(
      tap((isLoggedIn) => {
        //console.log(isLoggedIn);
        if (!isLoggedIn) {
          this.router.navigate(['']);
        }
      })
    );
  }
}
