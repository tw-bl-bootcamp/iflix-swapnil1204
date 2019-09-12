import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import {User} from '../../model/user/user.module';
import {HttpService} from '../../service/http/http.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user:User = new User();
  constructor(private httpService:HttpService,private router:Router) { 
  }
  email = new FormControl('',[Validators.required,Validators.email])
  getErrorMessage(){
    return this.email.hasError('required')?'you must enter email':
    this.email.hasError('email')?'Not a valid email':
    '';
  }
  password = new FormControl('',[Validators.required])
  getErrorMessagePassword(){
    return this.password.hasError('required')?'you must enter password':
    this.password.hasError('password')?'Not a valid password':
    '';
  }

  ngOnInit() {
  }
  showSucessMessage:boolean;
  serverErrorMessages:string;
  onLogin(){
    this.user.email = this.email.value;
    this.user.password = this.password.value;
    this.httpService.userRequest(this.user,'/login')
    .subscribe(
      (res:any) => {
        console.log('before hiting',res);
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        console.log(res);
      },
      err => {
          this.serverErrorMessages = 'Something went wrong!';
      }
    );
  }
}
