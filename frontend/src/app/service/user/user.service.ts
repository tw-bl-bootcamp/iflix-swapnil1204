import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { 
  }
  login(user,url){
    return this.http.post(environment.baseUrl+url,user);
    }
}
