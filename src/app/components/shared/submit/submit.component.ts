import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  @Input() loginForm: FormGroup;
  @Input() registerForm: FormGroup;
  isSubmitted  =  false;
  private users:string[] = [];
  ngOnInit() {
    this.users= JSON.parse(localStorage.getItem('users'))? JSON.parse(localStorage.getItem("users")) : [];

  }


  login(){
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.authService.login(this.loginForm.value);
    window.location.replace("/");
  }

  register(){
    var user = this.registerForm.value
    console.log(this.registerForm)
    var  exist = false
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i]['email']==user['email']){
       alert('User Already Exists, Please Register Again')
       this.router.navigateByUrl('register')
       exist = true;
      } }
    if (!exist){
      this.users.push(user)
      localStorage.setItem('users',JSON.stringify(this.users))  
      this.router.navigateByUrl('login')
    }
    

  }
}
