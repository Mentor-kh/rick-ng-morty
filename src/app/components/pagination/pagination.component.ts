import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';
import { IPagesInfo } from '../../interfaces/interfaces';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  @Input() public pagesInfo: IPagesInfo;
  @Input() public pageNumber: number;
  @Output() public activePage: EventEmitter<number> = new EventEmitter<number>();
  public pagesTotal: number;
  public pages: number[];
  public currentPageIndex: number = 0;
  public currentPage: number;

  public ngOnChanges(): void {
    this.currentPage = this.pageNumber;
    this.currentPageIndex = this.currentPage - 1;
    this.pagesTotal = this.pagesInfo.pages;
    this.pages = Array.from(Array(this.pagesTotal).keys());
  }

  public setPage(index: number): void {
    this.currentPageIndex = index;
    this.currentPage = this.currentPageIndex + 1;
    this.activePage.emit(this.currentPage);
  }

  public nextPage(): void {
    if (this.currentPageIndex < this.pagesTotal - 1) {
      this.currentPageIndex++;
      this.currentPage++;
      this.activePage.emit(this.currentPage);
    }
  }

  public prevPage(): void {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
      this.currentPage--;
      this.activePage.emit(this.currentPage);
    }
  }
}
