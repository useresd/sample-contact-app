import { Injectable } from '@angular/core';
import { User } from './user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user!: User | null;

  constructor() { }

  getUser() {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
  }

  clearUser() {
    this.user = null;
    return this.user;
  }
}
