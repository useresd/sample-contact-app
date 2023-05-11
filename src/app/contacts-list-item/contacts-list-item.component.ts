import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../contact';
import { FormBuilder } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'tbody[app-contacts-list-item]',
  templateUrl: './contacts-list-item.component.html',
  styleUrls: ['./contacts-list-item.component.css']
})
export class ContactsListItemComponent implements OnInit {

  @Input() contact!: Contact;
  @Output() deleted = new EventEmitter<Contact>();
  @Output() updated = new EventEmitter<Contact>();
  editMode: boolean = false;
  isEditing: boolean = false;
  isDeleteDialogShown: boolean = false;

  contactForm = this.formBuilder.group({
    name : '',
    phone: '',
    address: '',
    notes: ''
  });

  constructor(private formBuilder: FormBuilder, private contactsService: ContactsService) { }

  setEditMode(val: boolean) {
    this.editMode = val;
  }

  onDelete() {
    this.isDeleteDialogShown = true;
  }

  onDeleteConfirm(confirmed: boolean) {
    if(confirmed && this.contact) {
      this.contactsService.deleteContact(this.contact._id).subscribe(() => {
        this.deleted.emit(this.contact);
      })
    }
    this.isDeleteDialogShown = false;
  }

  onEditSubmit() {
    if(this.contact) {
      this.contactsService.updateContact(this.contact._id, this.contactForm.value).subscribe(() => {
        this.updated.emit(this.contact);
      });
    }
    this.editMode = false;
  }

  onEditCancel() {
    this.editMode = false;
    this.resetEditForm();
  }

  resetEditForm() {
    this.contactForm.setValue({
      name : this.contact?.name || "",
      phone: this.contact?.phone || "",
      address: this.contact?.address || "",
      notes: this.contact?.notes || ""
    })
  }

  ngOnInit(): void {
    this.resetEditForm();
  }
}
