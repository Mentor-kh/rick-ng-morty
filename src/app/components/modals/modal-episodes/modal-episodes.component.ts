import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IDialogData } from 'src/app/interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-episodes',
  templateUrl: './modal-episodes.component.html',
  styleUrls: ['./modal-episodes.component.css']
})
export class ModalEpisodesComponent implements OnInit, OnDestroy {
  public panelOpenState: boolean = false;
  private $dialogRef: Subscription;
  public constructor(
    public dialogRef: MatDialogRef<ModalEpisodesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData) { }

  public ngOnInit(): void {
    this.$dialogRef = this.dialogRef.afterOpened().subscribe(() => this.panelOpenState = true);
  }

  public ngOnDestroy(): void {
    this.$dialogRef.unsubscribe();
  }

  private onNoClick(): void {
    this.dialogRef.close();
  }
}
