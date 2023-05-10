import { Component, Input } from '@angular/core';
import { Contact, contacts } from '../contact';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent {
  @Input() contacts?: Contact[];
}
