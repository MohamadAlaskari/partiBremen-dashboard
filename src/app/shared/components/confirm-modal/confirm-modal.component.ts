import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss',
})
export class ConfirmModalComponent {
  @Input() modalTitle: string = '';
  @Input() modalBody: string = '';
  @Output() result = new EventEmitter<boolean>();

  constructor() {}
  closeModal(result: boolean): void {
    this.result.emit(result);
  }


}
