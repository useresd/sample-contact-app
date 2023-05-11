import { Component, OnInit } from '@angular/core';
import { Contact, contacts } from '../contact';
import { Observable, concatAll } from 'rxjs';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contacts!: Contact[];
  isAddContactDialogShown: Boolean = false;

  constructor(private contactsService: ContactsService) {}

  onAddContact() {
    this.isAddContactDialogShown = true;
  }

  async onCloseAddDialog(added: boolean) {
    this.isAddContactDialogShown = false;
    if(added) {
      this.fetchContacts();
    }
  }

  onContactDeleted(contact: Contact) {
    this.fetchContacts();
  }

  fetchContacts() {
    this.contactsService.fetchContacts().subscribe(contacts => {
      this.contacts = contacts;
    });
  }

  ngOnInit(): void {
      this.fetchContacts();
  }
}
