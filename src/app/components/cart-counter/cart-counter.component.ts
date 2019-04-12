import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { range } from 'rxjs';
import { Router } from '@angular/router';
import { StreamService } from 'src/app/services/stream.service';

@Component({
  selector: 'app-cart-counter',
  templateUrl: './cart-counter.component.html',
  styleUrls: ['./cart-counter.component.scss']
})
export class CartCounterComponent implements OnInit {

  public currentItems;
  items: [];
  item:[];
  constructor(private http: HttpClient,private router: Router,private stream :StreamService) { 
  this.stream.getCart().subscribe(res => this.currentItems = res)
  
  }
 
  ids: any []=[];

currentUser: any = JSON.parse(localStorage.getItem('CurrentUser'));
 ngOnInit() {
  this.http.get('../../../assets/json/items.json')
  .subscribe(data => {
  this.items = data["items"];
});
 this.item = this.items
if(this.currentItems){
 for (var i= 0;i <this.currentItems.length;i++){
  this.ids.push(parseInt(this.currentItems[i]['id']))
}}

 }

 
 removeCart(){
  var id = event.target['id']
    for (var i = 0; i < this.currentItems.length; i++) {
      if (this.currentItems[i]['id']== id){
        if (this.currentItems[i]['count']==1){
            this.currentItems.splice(i,1)
            if (this.currentItems.length==0){
            }
        }
        else{
          this.currentItems[i]['count']=  this.currentItems[i]['count'] -1}
}
}
localStorage.setItem('cart',JSON.stringify(this.currentItems));
}

public navigateTo(path:string):void{
  this.router.navigate([path]);
}

}
