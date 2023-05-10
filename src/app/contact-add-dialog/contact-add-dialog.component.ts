import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from "@angular/forms"

@Component({
  selector: 'app-contact-add-dialog',
  templateUrl: './contact-add-dialog.component.html',
  styleUrls: ['./contact-add-dialog.component.css']
})
export class ContactAddDialogComponent {
  @Output() close = new EventEmitter();

  contactForm = this.formBuilder.group({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
      this.contactForm.reset();
      console.log(this.contactForm.value);
      this.close.emit();
  }

}
