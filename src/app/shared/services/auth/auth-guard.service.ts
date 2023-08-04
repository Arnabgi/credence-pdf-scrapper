import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import { StorageService } from '../storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor( 
    private router: Router, 
    private storage:StorageService
    ){}
  /**************** ************
  Function name : canActivate
  Author :
  CreatedDate : 15.11.2021

  Purpose : Activate
  Params: next, state
*****************************/
canActivate(route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {
  if(!this.storage.isLogin()) {
    console.log("Not login");
    this.router.navigateByUrl('/auth');
    return false;
  }
  return true;
 }
}
