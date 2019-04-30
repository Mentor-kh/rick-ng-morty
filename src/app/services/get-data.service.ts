import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { ICharacter } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  public constructor(
    private httpClient: HttpClient
  ) { }

  public getData(url: string): Observable<any> {
    return this.httpClient
      .get<ICharacter[]>(`${environment.urlApi}?${url}`)
      .pipe(
        map((response: ICharacter[]) => response)
      );
  }
}
