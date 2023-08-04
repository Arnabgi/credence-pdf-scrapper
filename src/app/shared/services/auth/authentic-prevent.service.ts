import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticPreventService implements CanActivate {

  constructor(
    private storage: StorageService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.storage.isLogin()) {
      this.router.navigateByUrl('dashboard');
      return false;
    }
    return true;
  }
}
