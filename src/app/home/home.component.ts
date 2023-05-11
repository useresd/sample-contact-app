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
  page: number = 1;
  totalPages: number = 100;

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

  onContactUpdated(contact: Contact) {
    this.fetchContacts();
  }

  fetchContacts() {
    this.contactsService.fetchContacts(this.page).subscribe(result => {
      this.contacts = result.data;
      this.totalPages = result.totalPages;
    });
  }

  ngOnInit(): void {
    this.fetchContacts();
  }

  incrementPage() {
    if(this.page < this.totalPages) {
      this.page += 1;
      this.fetchContacts();
    }
  }

  decrementPage() {
    if(this.page > 1) {
      this.page -= 1;
      this.fetchContacts();
    }
  }
}
