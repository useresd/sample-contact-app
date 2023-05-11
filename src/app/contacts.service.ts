import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contacts: Contact[] = [];

  constructor(private http: HttpClient) { }

  fetchContacts() {
    return this.http.get<Contact[]>("http://localhost:3000/contacts");
  }

  getContacts() {
    return this.contacts;
  }

  deleteContact(contactId: string) {
    return this.http.delete(`http://localhost:3000/contacts/${contactId}`);
  }
}