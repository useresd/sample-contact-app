import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contacts: Contact[] = [];

  constructor(private http: HttpClient) { }

  fetchContacts(page: number) {
    return this.http.get<{data: Contact[], totalPages: number}>("http://localhost:3000/contacts", {
      params: {
        page
      }
    });
  }

  deleteContact(contactId: string) {
    return this.http.delete(`http://localhost:3000/contacts/${contactId}`);
  }

  updateContact(contactId: string, contact: any) {
    return this.http.put(`http://localhost:3000/contacts/${contactId}`, contact);
  }
}