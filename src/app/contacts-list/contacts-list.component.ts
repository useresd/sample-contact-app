import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact, contacts } from '../contact';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent {
  @Input() contacts!: Contact[];
  @Output() deleted = new EventEmitter<Contact>();
}
