import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
export interface LoaderState {
  show: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loaderSubject = new BehaviorSubject<LoaderState>({show: false});
  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  /**************** ************
  Function name : show
  Author :
  CreatedDate : 15.11.2021

  Purpose : Loader Show
  Params:
*****************************/
show() {
  this.loaderSubject.next(<LoaderState>{ show: true });
}
/**************** ************
Function name : hide
Author :
CreatedDate : 15.11.2021

Purpose : Loader Hide
Params:
*****************************/
hide() {
  this.loaderSubject.next(<LoaderState>{ show: false });
  // setTimeout(() => {
  //   this.loaderSubject.next(<LoaderState>{ show: false });
  // }, 2000);
}

get loaderStateObservable(): Observable<LoaderState> {
  return this.loaderState;
}
}
