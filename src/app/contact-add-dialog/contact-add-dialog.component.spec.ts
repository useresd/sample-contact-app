import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAddDialogComponent } from './contact-add-dialog.component';

describe('ContactAddDialogComponent', () => {
  let component: ContactAddDialogComponent;
  let fixture: ComponentFixture<ContactAddDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactAddDialogComponent]
    });
    fixture = TestBed.createComponent(ContactAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
