import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact, contacts } from '../contact';
import { Observable, Subscription, catchError } from 'rxjs';
import { ContactsService } from '../contacts.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { LoadingService } from '../loading.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  contacts!: Contact[];
  isAddContactDialogShown: Boolean = false;
  currentUser!: User | null;
  editLockSubscription!: Subscription;
  editUnlockSubscription!: Subscription;
  
  // pagination
  page: number = 1;
  totalPages: number = 0;
  
  // filtering
  filterForm = new FormGroup({
    name: new FormControl(""),
    phone: new FormControl(""),
    address: new FormControl(""),
    notes: new FormControl("")
  })

  constructor(
    private contactsService: ContactsService, 
    private userService: UserService, 
    private router: Router, 
    private loadingService: LoadingService,
    private authService: AuthService
  ) {}

  onAddContact() {
    this.isAddContactDialogShown = true;
  }

  async onCloseAddDialog(added: boolean) {
    this.isAddContactDialogShown = false;
    if(added) {
      this.fetchContacts();
    }
  }

  onContactDeleted(contact: Contact) {
    this.fetchContacts();
  }

  onContactUpdated(contact: Contact) {
    this.fetchContacts();
  }

  fetchContacts() {
    const { name , phone, address, notes } = this.filterForm.value;

    const filterForm = {
      name: name || "",
      phone: phone || "",
      address: address || "",
      notes: notes || ""
    }

    this.loadingService.setLoading(true);

    this.contactsService.fetchContacts(this.page, filterForm).pipe(
      
    ).subscribe(result => {
      this.contacts = result.data;
      this.totalPages = result.totalPages;
      this.loadingService.setLoading(false);
    });
  }

  ngOnInit(): void {
    
    // get all contacts from the server
    this.fetchContacts();

    // get the current loggedin user
    this.currentUser = this.userService.getUser();

    // subscribe for contact edit lock
    this.editLockSubscription = this.contactsService.onContactLocked().subscribe(({contactId}) => {
      
      // check if the contact is locked by the current user, if so don't lock it for him
      const index = this.contacts.findIndex(each => each._id == contactId);
      if(index != -1) {
        this.contacts[index].isLocked = true;
      }

    })

    // subscribe for contact edit unlock
    this.editUnlockSubscription = this.contactsService.onContactUnlocked().subscribe(({contactId, contact}) => {
      const index = this.contacts.findIndex(each => each._id == contactId);
      if(index != -1) {
        this.contacts[index] = contact;
        this.contacts[index].isLocked = false;
      }
    })
  }

  ngOnDestroy(): void {
      
    // remove subscription from contact edit lock/unlock feature
    this.editLockSubscription.unsubscribe();
    this.editUnlockSubscription.unsubscribe();

  }

  incrementPage() {
    if(this.page < this.totalPages) {
      this.page += 1;
      this.fetchContacts();
    }
  }

  decrementPage() {
    if(this.page > 1) {
      this.page -= 1;
      this.fetchContacts();
    }
  }

  onFilterSubmit() {
    this.page = 1;
    this.fetchContacts();
  }

  onFilterClear() {
    this.filterForm.reset();
    this.onFilterSubmit();
  }

  onLogout() {
    this.authService.clearToken();
    localStorage.removeItem("token");
    this.router.navigate(["/login"])
  }

}
