import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LfdTask';
  today = new Date();
  subscription: Subscription = new Subscription;
  userName: any="";
  constructor(public router:Router,public _dashboard:DashboardService){

  }
  Logout(){
    this._dashboard.setUser(null)
    this._dashboard.clearLocalstorage()
    this.router.navigate(['/']);
  }
  checkUser(){
    const userObj = this._dashboard.getLocalStorage('login');
    if(userObj){
      this._dashboard.setUser(JSON.parse(userObj))
    }
  }
  ngOnInit(): void {
    this.checkUser()
    this.subscription = this._dashboard.userSubject.subscribe((x:any)=>{
      if(x &&  x.userName){
        this.userName = x.userName
      }else{
        this.userName=""
      }
    })   
  }
}
