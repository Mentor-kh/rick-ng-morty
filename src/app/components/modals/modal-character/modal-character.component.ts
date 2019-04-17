import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IDialogData } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-modal',
  templateUrl: './modal-character.component.html',
  styleUrls: ['./modal-character.component.css']
})
export class ModalComponent {
  @Output() public dialogRefEmit: EventEmitter<IDialogData> = new EventEmitter<IDialogData>();
  public constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData) { }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
