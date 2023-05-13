import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(private router: Router, private userService: UserService){}

  loginForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  })

  onLoginSubmit() {
    const { username, password } = this.loginForm.value;
    if((username == "user1" && password == "user1") || (username == "user2" && password == "user2")) {
      const user = new User(username);
      this.userService.setUser(user);
      // temproary store the user in local storage to avoid logout on refresh
      localStorage.setItem("username", username);
      this.router.navigate(["/"]);
      return;
    }
    window.alert("Please check your username/password");
  }
}
