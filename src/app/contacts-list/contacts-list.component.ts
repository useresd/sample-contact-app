import { Component, EventEmitter, Input, Output, OnChanges, OnInit } from '@angular/core';
import { Contact, contacts } from '../contact';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  @Input() contacts!: Contact[];
  @Output() deleted = new EventEmitter<Contact>();
  @Output() updated = new EventEmitter<Contact>();
  @Output() pageChanged = new EventEmitter<number>();
  @Input() totalPages!: number;
  @Input() page: number = 1;


  ngOnInit(): void {
    
  }
}