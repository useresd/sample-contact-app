import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home/home.component'
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactAddDialogComponent } from './contact-add-dialog/contact-add-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactsListComponent,
    ContactAddDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
