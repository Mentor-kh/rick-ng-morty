import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEpisodesComponent } from './modal-episodes.component';

describe('ModalEpisodesComponent', () => {
  let component: ModalEpisodesComponent;
  let fixture: ComponentFixture<ModalEpisodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEpisodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEpisodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
