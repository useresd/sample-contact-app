import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "./../environments/environment";
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';
import { User } from './user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token!: string | null;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  login(username: string, password: string) {
    return this.http.post<{token: string}>(`${environment.apiURL}/login`, {username, password});
  }

  clearToken() {
    this.token = null;
    this.userService.clearUser();
  }

  setToken(token: string) {
    this.token = token;
    this.setUser();
  }

  getToken() {
    return this.token;
  }

  setUser() {
    if(this.token) {
      const payloadString = this.token.split(".")[1];
      var payload = JSON.parse(atob(payloadString));
      var user = new User(payload.sub);
      this.userService.setUser(user);
    }
  }
}
