
import { Component, OnInit } from "@angular/core";
import { AuthService } from '../auth.service';
import { AppUser } from "../models/app-user";

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent  {

  appUser:AppUser;

  constructor(private auth: AuthService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout(){
    this.auth.logout();
  }

}
