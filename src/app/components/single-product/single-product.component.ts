import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  items: [];
  id:any
  constructor(private router :Router,private http: HttpClient,private route :ActivatedRoute) { }
  
  ngOnInit() {
    this.http.get('../../../assets/json/items.json')
    .subscribe(data => {
    this.items = data["items"];
    this.id = parseInt(this.route.snapshot.paramMap.get('id'))
    console.log(this.id);

  });
  }

 }
