import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public login(userInfo: User){
    console.log(userInfo)
    localStorage.setItem('CurrentUser', JSON.stringify([userInfo.email,userInfo.password]));
  }

  public isLoggedIn(){
    return localStorage.getItem('CurrentUser') !== null;

  }

  public logout(){
    localStorage.removeItem('CurrentUser');
  }
}