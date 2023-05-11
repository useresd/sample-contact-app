import { Component, OnInit } from '@angular/core';
import { Contact, contacts } from '../contact';
import { Observable } from 'rxjs';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contacts!: Observable<Contact[]>;
  isAddContactDialogShown: Boolean = false;

  constructor(private contactsService: ContactsService) {}

  onAddContact() {
    this.isAddContactDialogShown = true;
  }

  ngOnInit(): void {
      this.contacts = this.contactsService.getContacts();
  }
}
