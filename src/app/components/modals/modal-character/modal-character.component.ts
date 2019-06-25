import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IDialogData } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-modal',
  templateUrl: './modal-character.component.html',
  styleUrls: ['./modal-character.component.css']
})
export class ModalComponent {
  public constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData) { }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
