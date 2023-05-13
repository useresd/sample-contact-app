import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contacts: Contact[] = [];
  lockedContactsIds: string[] = [];

  constructor(private http: HttpClient, private socket: Socket) {}

  lockContact(contact: Contact, user: User) {
    this.socket.emit("lock-contact", {contactId: contact._id, username: user.username});
  }

  unlockContact(contact: Contact) {
    this.socket.emit("unlock-contact", {contactId: contact._id});
  }

  onContactLocked() {
    return this.socket.fromEvent<{contactId: string, username: string}>("contact-locked");
  }

  onContactUnlocked() {
    return this.socket.fromEvent<{contactId: string, contact: Contact}>("contact-unlocked");
  }

  fetchContacts(page: number, filterForm: {name: string, phone: string, address: string, notes: string}) {
    return this.http.get<{data: Contact[], totalPages: number}>("http://localhost:3000/contacts", {
      params: {
        page,
        ...filterForm
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