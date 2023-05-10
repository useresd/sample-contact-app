import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  @Input() message: string = "Are you sure?";
  @Input() title: string = 'Confirm';
  @Input() callable?: Function;
  @Output() close = new EventEmitter<boolean>();
}
