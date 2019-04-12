import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: BehaviorSubject<number> = new BehaviorSubject(0);
  constructor() { 
    this.user.next(JSON.parse(localStorage.getItem('user')));

  }

  getUser(){
    return this.user.asObservable();
   }
   setUser(val?: number){
    this.user.next(val);
   }
}
