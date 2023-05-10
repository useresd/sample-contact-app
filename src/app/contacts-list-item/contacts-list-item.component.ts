import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { FormBuilder } from "@angular/forms"

@Component({
  selector: 'tbody[app-contacts-list-item]',
  templateUrl: './contacts-list-item.component.html',
  styleUrls: ['./contacts-list-item.component.css']
})
export class ContactsListItemComponent implements OnInit {

  @Input() contact?: Contact;
  editMode: boolean = false;
  isEditing: boolean = false;
  isDeleteDialogShown: boolean = false;

  contactForm = this.formBuilder.group({
    name : '',
    phone: '',
    address: '',
    notes: ''
  });

  constructor(private formBuilder: FormBuilder) { }

  setEditMode(val: boolean) {
    this.editMode = val;
  }

  onDelete() {
    this.isDeleteDialogShown = true;
  }

  onDeleteConfirm(confirmed: boolean) {
    if(confirmed) {
      window.alert(`Deleting ${this.contact?.name}...`);
    }
    this.isDeleteDialogShown = false;
  }

  ngOnInit(): void {
    this.contactForm.setValue({
      name : this.contact?.name || "",
      phone: this.contact?.phone || "",
      address: this.contact?.address || "",
      notes: this.contact?.notes || ""
    })
  }
}
