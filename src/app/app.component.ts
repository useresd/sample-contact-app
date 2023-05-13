import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { User } from './user';
import { LoadingService } from './loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  
  title = 'contacts-app';
  currentUser!: User | null;
  loading: boolean = false;
  loadingSubscription!: Subscription;

  constructor(private userService: UserService, private router: Router, private loadingSrevice: LoadingService) {}

  ngOnInit(): void {
    const username = localStorage.getItem("username");
    if(username) {
      this.userService.setUser(new User(username));
    }
    this.loadingSubscription = this.loadingSrevice.loading$.subscribe(value => {
      this.loading = value;
    })
  }

  ngOnDestroy(): void {
      this.loadingSubscription.unsubscribe();
  }
}
