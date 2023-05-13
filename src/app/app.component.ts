import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'contacts-app';
  currentUser!: User | null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
      const username = localStorage.getItem("username");
      if(username) {
        this.userService.setUser(new User(username));
      }
  }
}
