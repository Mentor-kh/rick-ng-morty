import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatExpansionModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { CharacterComponent } from './components/character/character.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FilterComponent } from './components/filter/filter.component';
import { ModalComponent } from './components/modals/modal-character/modal-character.component';
import { ModalEpisodesComponent } from './components/modals/modal-episodes/modal-episodes.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    PaginationComponent,
    FilterComponent,
    ModalComponent,
    ModalEpisodesComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatExpansionModule
  ],
  entryComponents: [ModalComponent, ModalEpisodesComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
