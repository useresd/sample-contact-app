import { Injectable } from '@angular/core';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contacts: Contact[] = [];

  constructor() { }

  getContacts() {
    return this.contacts;
  }
}
