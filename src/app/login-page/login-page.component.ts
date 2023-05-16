import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'
import { UserService } from '../user.service';
import { User } from '../user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(private router: Router, private userService: UserService, private authService: AuthService){}

  loginForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  })

  onLoginSubmit() {
    
    const { username, password } = this.loginForm.value;

    this.authService.login(username || "", password || "").subscribe(({token}) => {
      this.authService.setToken(token);
      localStorage.setItem("token", token);
      this.router.navigate(["/"]);
    });
  }
}
