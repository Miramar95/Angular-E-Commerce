import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StreamService {
  private cart: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {
    this.cart.next(JSON.parse(localStorage.getItem('cart')));
   }
   getCart(){
    return this.cart.asObservable();
   }
   setCart(val?: number){
    this.cart.next(val);
   }
}
