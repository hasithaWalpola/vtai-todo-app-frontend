import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/shared/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot) {
        const userToken = this.authService.getUserToken().token;

        if (userToken) {

            const roles = route.data['roles'] as Array<string>;
            if (roles && roles.length > 0) {
                const userRole = this.authService.getLoggedUser().role;
                const found = roles.filter(a => a == userRole?.toString());
                if (found && found.length > 0) {
                    return true;
                } else {
                    this.router.navigate(['/home']);
                    return false;
                }
            }
            return true;

        } else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login']);
            return false;
        }

    }
}
