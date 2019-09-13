import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }
  userRequest(user, url) {
    let response = this.http.post(environment.baseUrl + url, user);
    return response;
  }
  userGetRequest(url) {
    let response = this.http.get(environment.baseUrl + url);
    return response;
  }
}
