import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IDialogData } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-modal-episodes',
  templateUrl: './modal-episodes.component.html',
  styleUrls: ['./modal-episodes.component.css']
})
export class ModalEpisodesComponent implements OnInit {
  @Output() public dialogRefEmit: EventEmitter<IDialogData> = new EventEmitter<IDialogData>();
  public panelOpenState: boolean = false;
  public constructor(
    public dialogRef: MatDialogRef<ModalEpisodesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData) { }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public ngOnInit(): void {
    this.dialogRef.afterOpened().subscribe(() => {
      this.panelOpenState = true;
    });
  }
}
