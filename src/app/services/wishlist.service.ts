import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wish: BehaviorSubject<number> = new BehaviorSubject(0);
  constructor() {
    this.wish.next(JSON.parse(localStorage.getItem('cart')));

   }

  getWish(){
    return this.wish.asObservable();
   }
   setWish(val?: number){
    this.wish.next(val);
   }


}
