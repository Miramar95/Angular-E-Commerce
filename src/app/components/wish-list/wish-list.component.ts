import { WishlistService } from 'src/app/services/wishlist.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {
  public currentItems;
  items: [];
  cart:any;
  constructor(private wish :WishlistService,private http: HttpClient) {
    this.wish.getWish().subscribe(res => this.currentItems = res)
    this.cart= JSON.parse(localStorage.getItem('wish'))? JSON.parse(localStorage.getItem("wish")) : [];

   }

  ngOnInit() {
    this.http.get('../../../assets/json/items.json')
    .subscribe(data => {
    this.items = data["items"];
  });
  }
removeWish(){
    var id = event.target['id']  

      for (var i = 0; i < this.cart.length; i++) {
        console.log('hi')
        if (this.cart[i].item.id == id){
          if (this.cart[i]['count'] ==1){
              this.cart.splice(i,1)
              if (this.cart.length==0){
              }
          }
          else{
            this.cart[i]['count']=  this.cart[i]['count'] -1}
  }
  }
  localStorage.setItem('wish',JSON.stringify(this.cart))
  }
}
