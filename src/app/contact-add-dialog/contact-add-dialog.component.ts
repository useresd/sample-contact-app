import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from "@angular/forms"
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-contact-add-dialog',
  templateUrl: './contact-add-dialog.component.html',
  styleUrls: ['./contact-add-dialog.component.css']
})
export class ContactAddDialogComponent {
  @Output() close = new EventEmitter<boolean>();

  contactForm = this.formBuilder.group({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private loadingService: LoadingService) {}

  onSubmit() {
    this.loadingService.setLoading(true);
    this.http.post<{message: string}>("http://localhost:3000/contacts", this.contactForm.value).subscribe(() => {
      this.loadingService.setLoading(false);
      this.close.emit(true);
    });
  }

}
