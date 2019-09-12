import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class User {
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  mobileNumber:string;
}