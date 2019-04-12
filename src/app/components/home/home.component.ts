import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StreamService } from 'src/app/services/stream.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: [];
  constructor(private router :Router,private http: HttpClient,private stream :StreamService) { }
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


getId(){
  console.log(event.target['id'])
  localStorage.setItem('item',JSON.stringify(event.target['id']))}

}
