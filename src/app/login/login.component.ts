import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  alert: any = false;
  errorMessage: any = ""
  Users = [
    {
      userName: 'Admin',
      password: '123',
      role: 1
    },
    {
      userName: 'Super',
      password: '123',
      role: 2
    }
  ]
  constructor(public router: Router, public _dashboard: DashboardService) {
    this._dashboard.clearLocalstorage()
    this._dashboard.setUser(null)
  }

  authentication = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  login() {

    let loginobj = this.authentication.value;
    let UserObj = this.Users.find(x => x.userName.toUpperCase() == loginobj.userName.toUpperCase())
    if (UserObj && UserObj.userName) {
      if (UserObj.password == loginobj.password) {
        this.alert=true
        this.navigate(UserObj)
      } else {
        this.errorMessage = "Password is invalid"
      }
    } else {
      this.errorMessage = "Cannot find username"
    }
    //  this.alert=true
    this.authentication.reset({})
  }

  navigate(userObj: any) {
    this._dashboard.setLocalStorage('login', userObj)
    this._dashboard.setUser(userObj);
    this.router.navigate(['dashboard/family'])
  }
  close(num: Number) {
    if (num == 1) {
      this.alert = false;
    } else {
      this.errorMessage = ""
    }

  }
  ngOnInit(): void {


  }

}

