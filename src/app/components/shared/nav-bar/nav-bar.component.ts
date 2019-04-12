import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { range } from 'rxjs';
import { Router } from '@angular/router';
import { StreamService } from 'src/app/services/stream.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public currentItems;
  constructor(private http: HttpClient,private router: Router,private stream :StreamService) { 
  this.stream.getCart().subscribe(res => this.currentItems = res)
  console.log(this.currentItems)
  }
  items: object[];
   ids = []
   count=[]

currentUser: any = JSON.parse(localStorage.getItem('CurrentUser'));
  ngOnInit() {
    this.http.get('../../../assets/json/items.json')
    .subscribe(data => {
    this.items = data["items"];
  });
  }
GetId(){
  this.ids =[]
  this.count=[]
  if (this.currentItems){
  for (var i= 0;i<this.currentItems.length;i++){
     this.ids.push(this.currentItems[i]['id'])
  }
  for (var i= 0;i<this.ids.length;i++){
    this.count.push(i)
 }
  
}}
removeCart(){
  var id = event.target['id']
  console.log(this.ids)

    for (var i = 0; i < this.currentItems.length; i++) {
     
      if (this.currentItems[i]['id']== id){
        console.log(id)
        if (this.currentItems[i]['count'] ==1){
            this.currentItems.splice(i,1)
            console.log(this.currentItems)
            if (this.currentItems.length==0){
              this.count = []
            }
        }
        else{
          this.currentItems[i]['count']=  this.currentItems[i]['count'] -1}
}
}
localStorage.setItem('cart',JSON.stringify(this.currentItems))
}

public navigateTo(path:string):void{
  this.router.navigate([path]);
}
public logOut(path:string):void{
  localStorage.removeItem("CurrentUser");
  this.router.navigateByUrl('/')
}
}
