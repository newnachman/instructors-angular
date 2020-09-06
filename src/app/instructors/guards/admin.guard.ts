import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.checkAuth()){
        // console.log("Auth = true");
        return true;
      } else {
        // console.log("Auth = false");
        this.router.navigate(['/welcome']);
        return false;
      }
  }
  
  checkAuth(){
    // console.log("!! : " + !!localStorage.getItem('authStatus'));
    return !!localStorage.getItem('authStatus');
  }
}
