import { Component, OnInit } from '@angular/core';
import {HttpService} from 'src/app/service/http/http.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  Movies: any;
  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    this.onLoad();
  }
  showSucessMessage: boolean;
  serverErrorMessages: string;

  onLoad() {
    console.log('enter in get all notes');
    this.httpService.userGetRequest('/movie').subscribe(
      (res: any) => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        console.log(res.data);
        this.Movies = res.data;
        console.log('yesss', this.Movies);
      },
      err => {
        console.log(err);
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong !';
      }
    );
}
}