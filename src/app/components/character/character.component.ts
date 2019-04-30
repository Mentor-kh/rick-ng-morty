import { Component, Input, OnDestroy } from '@angular/core';
import { ICharacter, IEpisodes, ILocation } from '../../interfaces/interfaces';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../modals/modal-character/modal-character.component';
import { ModalEpisodesComponent } from '../modals/modal-episodes/modal-episodes.component';
import { from, Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnDestroy {
  @Input() public characters: ICharacter[];
  public character: ICharacter;
  public dataLocation: Observable<ILocation> = new Observable<ILocation>();
  public dataEpisodes: Observable<IEpisodes[]> = new Observable<IEpisodes[]>();
  public characterDialogRef: MatDialogRef<ModalComponent>;
  public episodesDialogRef: MatDialogRef<ModalEpisodesComponent>;
  public urlApiLocation: Subject<string> = new Subject<string>();
  public urlApiEpisodes: Subject<string> = new Subject<string>();
  public $urlApiLocation: Subscription;
  public $urlApiEpisodes: Subscription;
  public $characterDialogRef: Subscription;
  public $dataLocation: Subscription;
  public $dataEpisodes: Subscription;
  public listEpisodes: string;

  public constructor(
    public dialogCharacter: MatDialog,
    public dialogEpisodes: MatDialog
  ) {
    this.$urlApiLocation = this.urlApiLocation.subscribe({
      next: (url: string) => {
        this.dataLocation = from(fetch(url)
          .then((response: Response) => response.json())
          .catch((error: Error) => console.error('LocationERROR: ', error)));

        this.$dataLocation = this.dataLocation.subscribe((response: ILocation) => {
          const location: ILocation = response;
          const character: ICharacter = this.character;

          this.characterDialogRef = this.dialogCharacter.open(ModalComponent, {
            width: '650px',
            data: { character, location }
          });

          this.$characterDialogRef = this.characterDialogRef.afterClosed().subscribe((dialogResult: string[]): void => {
            if (dialogResult) {
              this.listEpisodes = dialogResult.reduce((episodes: string, current: string, index: number): string => {
                const arr: string[] = current.split('/');
                const episode: string = arr[arr.length - 1];

                return `${episodes},${episode}`;
              });
              this.urlApiEpisodes.next(this.listEpisodes);
            }
          });
        },
          (error: Error) => console.error('dialogCloseERROR: ', error));
      }
    });
    this.$urlApiEpisodes = this.urlApiEpisodes.subscribe({
      next: (url: string) => {
        this.dataEpisodes = from(fetch(url)
          .then((response: Response) => response.json())
          .catch((error: Error) => console.error('LocationERROR: ', error)));

        this.$dataEpisodes = this.dataEpisodes.subscribe((resultEpisodes: IEpisodes[]) => {
          this.episodesDialogRef = this.dialogEpisodes.open(ModalEpisodesComponent, {
            width: '450px',
            data: resultEpisodes.length ? resultEpisodes : [resultEpisodes]
          });
        },
          (error: Error) => console.error('dialogEpisodesERROR: ', error));
      }
    });
  }

  public clickHandler(character: ICharacter): void {
    this.character = character;
    this.urlApiLocation.next(character.location.url);
  }

  public ngOnDestroy(): void {
    this.$urlApiLocation.unsubscribe();
    this.$urlApiEpisodes.unsubscribe();
    this.$characterDialogRef.unsubscribe();
    this.$dataLocation.unsubscribe();
    this.$dataEpisodes.unsubscribe();
  }
}
