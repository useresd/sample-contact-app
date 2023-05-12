import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact, contacts } from '../contact';
import { Observable, Subscription } from 'rxjs';
import { ContactsService } from '../contacts.service';
import { User } from '../user';
import { UserService } from '../user.service';

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
  filterQuery!: string;

  constructor(private contactsService: ContactsService, private userService: UserService) {}

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
    this.contactsService.fetchContacts(this.page, this.filterQuery).subscribe(result => {
      this.contacts = result.data;
      this.totalPages = result.totalPages;
    });
  }

  ngOnInit(): void {
    
    // get all contacts from the server
    this.fetchContacts();

    // get the current loggedin user
    this.currentUser = this.userService.getUser();

    // subscribe for contact edit lock
    this.editLockSubscription = this.contactsService.onContactLocked().subscribe(({contactId, username}) => {
      
      // check if the contact is locked by the current user, if so don't lock it for him
      if(username != this.currentUser?.username) {
        const index = this.contacts.findIndex(each => each._id == contactId);
        if(index != -1) {
          this.contacts[index].isLocked = true;
        }
      }
      
    })

    // subscribe for contact edit unlock
    this.editUnlockSubscription = this.contactsService.onContactUnlocked().subscribe(({contactId}) => {
      const index = this.contacts.findIndex(each => each._id == contactId);
      if(index != -1) {
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

}
