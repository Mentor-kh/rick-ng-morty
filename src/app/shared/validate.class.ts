import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GetDataService } from '../services/get-data.service';

@Injectable({ providedIn: 'root' })
export class CheckUrlApi implements AsyncValidator {
  public constructor(private getDataService: GetDataService) { }

  public validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.getDataService.getData(`${ctrl.value}`).pipe(
      map((isTaken: null | Observable<false>) => isTaken ? null : of(false)),
      catchError(() => of({ error: `There is no such filters combination` }))
    );
  }
}
