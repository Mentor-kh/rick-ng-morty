import { Component, OnDestroy, OnInit } from '@angular/core';
import { IApiResults, IApiScope, ICharacter, IFilterType, IPagesInfo } from './interfaces/interfaces';
import { Observable, Subject, Subscription } from 'rxjs';
import { GetDataService } from './services/get-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public title: string = 'ricky-morty';
  public result: IApiResults;
  public characters: ICharacter[];
  public pagesInfo: IPagesInfo;
  public data: Observable<IApiResults>;
  public $getDataService: Subscription;
  public $urlApiSource: Subject<string> = new Subject<string>();
  public apiScope: IApiScope = {
    filterValues: {
      search: '',
      status: '',
      gender: ''
    },
    url: '',
    pageNumber: 1
  };

  public constructor(
    private getDataService: GetDataService
  ) {
    this.$urlApiSource.subscribe({
      next: (url: string) => {
        this.$getDataService = this.getDataService.getData(url).subscribe((result: IApiResults) => {
          this.result = result;
          this.characters = this.result.results;
          this.pagesInfo = this.result.info;
        });
      },
      error: (error: Error) => console.error('urlApiSourceERROR: ', error),
      complete: () => console.log('complete'),
    });
  }

  public ngOnInit(): void {
    this.$urlApiSource.next(environment.urlApi);
  }

  public setActivePage(pageNumber: number): void {
    this.apiScope.pageNumber = pageNumber;
    this.createUrlrequest();
  }

  public filterCharacters(url: string | null): void {
    if (url !== null) {
      this.apiScope.url = url;
      this.createUrlrequest();
    } else {
      this.characters = [];
      this.pagesInfo.pages = 0;
      this.apiScope.pageNumber = 1;
    }
  }

  public createUrlrequest(): void {
    const url: string = `page=${this.apiScope.pageNumber}${this.apiScope.url}`;
    this.$urlApiSource.next(url);
  }

  public ngOnDestroy(): void {
    this.$urlApiSource.unsubscribe();
    this.$getDataService.unsubscribe();
  }
}
