import { Injectable } from '@angular/core';
import {CryptoService} from "./crypto.service";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private crypto:CryptoService
  ) { }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  setToken(value: string): void {
    localStorage.setItem('token', value)
  }

  setUserData(userData:any): void {
    const str = JSON.stringify(userData);
    this.setValue("_authuser", this.crypto.encryptAES(str));
  }

  getUserData() {
    try {
      const data = this.getValue("_authuser");
      return JSON.parse(this.crypto.decryptAES(data));
    }catch (e) {
      return null;
    }
  }

  removeToken(): void {
    localStorage.removeItem("token");
  }

  removeLoggedInUser():void {
    localStorage.removeItem("_authuser");
  }

  setValue(key:string, value:string):void {
    localStorage.setItem(key, value);
  }

  getValue(key:string, defaultValue:string=""):string {
    let data = localStorage.getItem(key);
    if(!data) return defaultValue ? defaultValue : "";
    return data;
  }

  isLogin(): boolean {
    return !!localStorage.getItem("token");
  }

  logout() {
    this.removeToken();
    this.removeLoggedInUser();

  }

  rememberMe(user_credentials:any) {
    if(typeof user_credentials === 'object') user_credentials = JSON.stringify(user_credentials);
    localStorage.setItem("omoidashite", this.crypto.encryptAES(user_credentials));
  }
  getUserCreds() {
    let user_creds = localStorage.getItem("omoidashite");
    if(user_creds) {
      user_creds = JSON.parse(this.crypto.decryptAES(user_creds));
    }
    return user_creds;
  }
  forgetMe() {
    localStorage.removeItem("omoidashite");
  }

  setComponentState(type:string, data:any) {
    const payload = {
      type:type,
      data:data
    };
    localStorage.setItem("__ngx-state", JSON.stringify(payload));
  }

  getComponentState():any {
    const data = localStorage.getItem("__ngx-state");
    return data ? JSON.parse(data) : null;
  }

  setAllowedModules(modules: Array<string>) {
    localStorage.setItem('_ftn-al-mod', this.crypto.encryptAES(JSON.stringify(modules)));
  }

  getAllowedModules(): Array<string> {
    let data: Array<string> = [];
    try {
      const _d = localStorage.getItem('_ftn-al-mod');
      if(_d) {
        return JSON.parse(this.crypto.decryptAES(_d));
      }
    } catch(e) {
      // if(!environment.production) {
      //   console.log(e, "get module error");

      // }
    }
    return data;
  }
}
