import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PlayingGame } from '../playing-game';
import { PlayingGameService } from '../playing-game.service';
import { Games } from '../games';
import { GlobalServiceService } from '../global-service.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TermsAndConditionComponent } from '../terms-and-condition/terms-and-condition.component';

import * as screenfull from 'screenfull';

@Component({
  selector: 'play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.css'],
  outputs: ['runningGame']
})
export class PlayGameComponent implements OnInit {
  public idMatched = false;
  public idAdded: string;
  public playerId: string;
  public currentGame: Array<PlayingGame> = [];
  public gameName: string;
  games: Games[];
  message = '';
  dialogRef = this.dialog.open(TermsAndConditionComponent, {
    width: '1200px'
  });

  displayedColumns: string[] = [
    'id',
    'GameName',
    'PlayersJoined',
    'GameStatus'
  ];
  dataSource2: MatTableDataSource<PlayingGame>;
  results: Array<PlayingGame> = [];
  endedGameResult: Array<PlayingGame> = [];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
    private _playingGameservice: PlayingGameService,
    private _globalService: GlobalServiceService
  ) {
    this._playingGameservice.getGameResultList().subscribe(res => {
      console.log('Showing you all the results');
      const temp: Array<PlayingGame> = res;
      temp.forEach(element => {
        if (element.GameStatus !== 'GE') {
          this.results.push(element);
        } else {
          this.endedGameResult.push(element);
        }
      });
      const gamesPlayed: Array<PlayingGame> = this.results;
      this.dataSource2 = new MatTableDataSource(gamesPlayed);
      this.dataSource2.paginator = this.paginator;
    });
  }

  ngOnInit() {

    this.dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    this._globalService.gamesList.subscribe(res => (this.games = res));
  }

  checkGameId(form: any) {
    console.log(this.idAdded);
    this._playingGameservice.getGameWithId(this.idAdded).subscribe(res => {
      this.currentGame = res;
      if(this.currentGame.length === 0){
        this.snackBar.open('Assignment Id does not exist. Try another one', 'Thanks', {
          duration: 3000
        });
      }
      this.currentGame.forEach(element => {
        if (
          element.id == this.idAdded &&
          (element.GameStatus == 'NS' || element.GameStatus == 'GS')
        ) {
          this.snackBar.open('Assignment Id Found. Enter your unique name to continue', 'Thanks', {
            duration: 3000
          });
          console.log(element.GameStatus);
          this.idMatched = true;
          this.gameName = element.GameName;
        } else {
          this.snackBar.open('Assignment has been ended. Try another one', 'Thanks', {
            duration: 3000
          });
        }
      });
    });
  }

  enterGame() {
    this.currentGame.forEach(element => {
      if (
        this.playerId !== undefined &&
        element.id === this.idAdded &&
        element.PlayersJoined.indexOf(this.playerId) == -1 &&
        (element.GameStatus == 'NS' || element.GameStatus == 'GS')
      ) {
        element.PlayersJoined.push(this.playerId);
        element.PlayersJoiningTime.push(new Date());
        element.PlayersSubmittingTime.push(null);
        element.PlayersScore.push('0');
        if (screenfull.enabled) {
          screenfull.request();
        }
        this._playingGameservice.UpdateGameEntry(element).subscribe(res => {
          element = res;
          this.router.navigateByUrl(
            'playgames/' +
              this.gameName +
              '/' +
              this.idAdded +
              '/' +
              this.playerId
          );
        });
      } else {
        this.message = 'Id Already exist. try with a new one';
        this.snackBar.open(
          'User Id already exists. Try another one.',
          'Thanks',
          {
            duration: 3000
          }
        );
      }
    });
  }


}
