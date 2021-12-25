import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardService } from './dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router, public _dashboard: DashboardService,){
    
  }
  canActivate() {
    const userObj = this._dashboard.getLocalStorage('login');
    if(userObj){
      return true
    }
    this.router.navigate(['/']);
    return false;
  }
  
}
