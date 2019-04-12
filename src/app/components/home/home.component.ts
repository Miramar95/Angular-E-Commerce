import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StreamService } from 'src/app/services/stream.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: [];
  constructor(private router :Router,private http: HttpClient,private stream :StreamService,private wish :WishlistService ) { }
  ngOnInit() {
    this.http.get('../../../assets/json/items.json')
    .subscribe(data => {
    this.items = data["items"];
  });

  }
  public navigateToSingle(path:string):void{
    this.router.navigate(['sp',event.target['id']]);
  }
  AddCart(){
    // GET ID of Item that is clicked
    var id = event.target['id']
    var itemCount ={}
    var cart= JSON.parse(localStorage.getItem('cart'))? JSON.parse(localStorage.getItem("cart")) : [];
    var itemsCart= cart
    var found 
    console.log(itemsCart)
    if (cart){
        for (var i = 0; i < cart.length; i++) {
          if (cart[i]['id']==id){
              itemsCart[i]['count']=  itemsCart[i]['count'] +1
              found = true } }
    if (!found){
        itemCount = {
          id:id,
          count:1}
        itemsCart.push(itemCount)
    }
    localStorage.setItem('cart',JSON.stringify(itemsCart))  
    }
    else{
      itemCount = {
        id:id,
        count:1
      }
      itemsCart.push(itemCount)
      console.log(itemsCart)
      localStorage.setItem('cart',JSON.stringify(itemsCart))
      
    }
    this.stream.setCart(JSON.parse(localStorage.getItem("cart")))
  }

  AddWish(){
    var idWish = event.target['id']
    console.log(idWish)
    var wish= JSON.parse(localStorage.getItem('wish'))? JSON.parse(localStorage.getItem("wish")) : [];
    var itemCount ={}
    var found 
    if (wish){
        for (var i = 0; i < wish.length; i++) {
          if (wish[i].item.id==idWish){
              wish[i]['count']= wish[i]['count'] +1
              found = true } }
    if (!found){
        itemCount = {
          item:this.items[idWish-1],
          count:1}
        wish.push(itemCount)
    }
    localStorage.setItem('wish',JSON.stringify(wish))  
    }
    else{
      itemCount = {
        item:this.items[idWish],
        count:1
      }
      wish.push(itemCount)
      localStorage.setItem('wish',JSON.stringify(wish))

    }
    console.log(wish[0].item.id)

    this.wish.setWish(JSON.parse(localStorage.getItem("wish")))

}


getId(){
  console.log(event.target['id'])
  localStorage.setItem('item',JSON.stringify(event.target['id']))}

}
