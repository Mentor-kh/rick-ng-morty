import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IFilterType } from 'src/app/interfaces/interfaces';
import { CheckUrlApi } from 'src/app/shared/validate.class';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnDestroy {
  private get getApiRequestError(): AbstractControl {
    return this.fakeForm.get('fakeInput');
  }
  @Output() public filterValues: EventEmitter<string | null> = new EventEmitter<string | null>();
  public filterForm: FormGroup = new FormGroup({
    search: new FormControl('', [Validators.required, Validators.minLength(4)]),
    status: new FormControl(''),
    gender: new FormControl('')
  });
  public fakeForm: FormGroup = new FormGroup({
    fakeInput:
      new FormControl('', null, this.checkUrlApi.validate.bind(this.checkUrlApi))
  });
  public apiRequestErrors: ValidationErrors;
  private filterErrors: ValidationErrors;
  private url: string;
  private $filterForm: Subscription;
  private $getApiRequestError: Subscription;

  public constructor(
    private checkUrlApi: CheckUrlApi
  ) { }

  public ngOnInit(): void {
    this.fakeForm.controls.fakeInput.markAsTouched();
    this.$filterForm = this.filterForm.valueChanges.subscribe((value: IFilterType) => {
      const nameString: string =
        value.search ? `&name=${value.search}` : '';
      const genderString: string =
        value.gender ? `&gender=${value.gender}` : '';
      const statusString: string =
        value.status ? `&status=${value.status}` : '';

      this.url = `${nameString}${genderString}${statusString}`;
      this.fakeForm.controls.fakeInput.patchValue(this.url);
      this.filterErrors = this.filterForm.controls.search.errors;
    });
    this.$getApiRequestError = this.getApiRequestError.statusChanges.subscribe((response: string) => {
      if (response === 'VALID') {
        this.filterValues.emit(this.url);
        this.apiRequestErrors = null;
      } else if (response === 'INVALID') {
        console.error(`Error: response is ${response}`);
        this.filterValues.emit(null);
        this.apiRequestErrors = this.fakeForm.controls.fakeInput.errors.error;
      }
    });
  }

  public ngOnDestroy(): void {
    this.$filterForm.unsubscribe();
    this.$getApiRequestError.unsubscribe();
  }
  public getApiRequestErrors = (): string => this.apiRequestErrors ? JSON.stringify(this.apiRequestErrors) : '';
  public getFilterError = (): string => this.filterErrors ? JSON.stringify(this.filterErrors) : null;
}
