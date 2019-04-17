import { Component, OnDestroy, OnInit } from '@angular/core';
import { IApiResults, IApiScope, ICharacter, IFilterType, IPagesInfo } from './interfaces/interfaces';
import { from, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public title: string = 'ricky-morty';
  public sourceUrl: string = 'https://rickandmortyapi.com/api/character/';
  public currentUrl: string = this.sourceUrl;
  public result: IApiResults;
  public characters: ICharacter[];
  public pagesInfo: IPagesInfo;
  public data: Observable<IApiResults>;
  public $urlApiSource: Subject<string> = new Subject<string>();
  public apiScope: IApiScope = {
    filterValues: {
      search: '',
      status: '',
      gender: ''
    },
    pageNumber: 1,
    currentUrl: this.sourceUrl
  };

  public constructor() {
    this.$urlApiSource.subscribe({
      next: (url: string) => {
        this.data = from(fetch(url)
          .then((response: Response) => response.json())
          .catch((error: Error) => {
            console.error('There has been a problem with your fetch operation: ' + error.message);
          }));

        this.data.subscribe(
          (result: IApiResults) => {
            this.result = result;
            this.characters = this.result.results;
            this.pagesInfo = this.result.info;
          },
          (error: Error) => console.error('ERROR: ', error));
      },
      error: (error: Error) => console.error('ERROR: ', error),
      complete: () => console.log('complete'),
    });
  }

  public ngOnInit(): void {
    this.$urlApiSource.next(this.sourceUrl);
  }

  public setActivePage(pageNumber: number): void {
    this.apiScope.pageNumber = pageNumber;
    this.createUrlrequest();
  }

  public filterCharacters(filterValues: IFilterType): void {
    this.apiScope.filterValues = filterValues;
    if (this.pagesInfo && this.pagesInfo.pages < this.apiScope.pageNumber) {
      this.apiScope.pageNumber = this.pagesInfo.pages;
    } else {
      this.apiScope.pageNumber = 1;
    }
    this.createUrlrequest();
  }

  public createUrlrequest(): void {
    const nameString: string =
      this.apiScope.filterValues.search ? `&name=${this.apiScope.filterValues.search}` : '';
    const genderString: string =
      this.apiScope.filterValues.gender ? `&gender=${this.apiScope.filterValues.gender}` : '';
    const statusString: string =
      this.apiScope.filterValues.status ? `&status=${this.apiScope.filterValues.status}` : '';
    const url: string = `${this.sourceUrl}?page=${this.apiScope.pageNumber}${nameString}${genderString}${statusString}`;

    this.$urlApiSource.next(url);
  }

  public ngOnDestroy(): void {
    this.$urlApiSource.unsubscribe();
  }
}
