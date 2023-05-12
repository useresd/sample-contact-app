import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user!: User;

  constructor() { }

  getUser() {
    return new User("user1");
  }

  setUser(user: User) {
    this.user = user;
  }
}
