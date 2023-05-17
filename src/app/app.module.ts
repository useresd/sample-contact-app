import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home/home.component'
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactAddDialogComponent } from './contact-add-dialog/contact-add-dialog.component';
import { ContactsListItemComponent } from './contacts-list-item/contacts-list-item.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { environment } from 'src/environments/environment';
import { HttpInterceptorProviders } from './http-interceptors';

const config: SocketIoConfig = {
	url: environment.apiURL,
  options: {
    autoConnect: true,
    transports: ['websocket'],
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactsListComponent,
    ContactAddDialogComponent,
    ContactsListItemComponent,
    ConfirmDialogComponent,
    LoginPageComponent,
    LoadingOverlayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    HttpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
