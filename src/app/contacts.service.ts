import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

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
    return this.http.get<{data: Contact[], totalPages: number}>(`${environment.apiURL}/contacts`, {
      params: {
        page,
        ...filterForm
      }
    });
  }

  deleteContact(contactId: string) {
    return this.http.delete(`${environment.apiURL}/contacts/${contactId}`);
  }

  storeContact(data: any) {
    return this.http.post<{message: string}>(`${environment.apiURL}/contacts`, data);
  }

  updateContact(contactId: string, contact: any) {
    return this.http.put(`${environment.apiURL}/contacts/${contactId}`, contact);
  }

}