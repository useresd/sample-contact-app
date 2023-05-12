import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contacts: Contact[] = [];
  lockedContactsIds: string[] = [];

  constructor(private http: HttpClient) { }

  private contactEditLockSource = new Subject<{contact: Contact, user: User}>();
  private contactEditUnlockSource = new Subject<Contact>();

  contactEditLock$ = this.contactEditLockSource.asObservable();
  contactEditUnlock$ = this.contactEditUnlockSource.asObservable();

  lockContact(contact: Contact, user: User) {
    this.contactEditLockSource.next({contact, user});
  }

  unlockContact(contact: Contact) {
    this.contactEditUnlockSource.next(contact);
  }

  fetchContacts(page: number, filterQuery: string | undefined | null) {
    return this.http.get<{data: Contact[], totalPages: number}>("http://localhost:3000/contacts", {
      params: {
        page,
        q: filterQuery || ""
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