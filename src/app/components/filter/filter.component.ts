import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IFilterType } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  public filterForm: FormGroup = new FormGroup({
    search: new FormControl(''),
    status: new FormControl(''),
    gender: new FormControl('')
  });
  @Output() public filterValues: EventEmitter<IFilterType> = new EventEmitter<IFilterType>();

  public ngOnInit(): void {
    this.filterForm.valueChanges.subscribe((value: IFilterType) => {
      this.filterValues.emit(value);
    });
  }
}
