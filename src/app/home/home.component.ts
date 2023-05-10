import { Component } from '@angular/core';
import { contacts } from '../contact';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  contacts = contacts;
  isAddContactDialogShown: Boolean = false;

  onAddContact() {
    this.isAddContactDialogShown = true;
  }
}
