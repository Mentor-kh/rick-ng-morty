import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MAT_LABEL_GLOBAL_OPTIONS,
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
import { GetDataService } from './services/get-data.service';
import { HttpClientModule } from '@angular/common/http';

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
    MatExpansionModule,
    HttpClientModule
  ],
  entryComponents: [ModalComponent, ModalEpisodesComponent],
  providers: [
    GetDataService,
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'always' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
