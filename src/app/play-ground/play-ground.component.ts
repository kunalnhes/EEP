import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { PlayingGameService } from '../playing-game.service';
import { PlayingGame } from '../playing-game';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { QuestionDialogComponent } from '../question-dialog/question-dialog.component';
import { ScoreComponent } from '../score/score.component';


@Component({
  selector: 'play-ground',
  templateUrl: './play-ground.component.html',
  styleUrls: ['./play-ground.component.css']
})
export class PlayGroundComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router,
    private _playingGameservice: PlayingGameService,
    private _Activatedroute: ActivatedRoute
  ) {}
  interval: any;
  gamePlayingId: string;
  score: string;
  playerId: string;
  gameId: string;
  public currentGame: Array<PlayingGame> = [];
  public startGame = false;

  ngOnInit() {
    this._Activatedroute.params.subscribe(params => {
      this.gamePlayingId = params['id'];
    });
    this._Activatedroute.params.subscribe(params => {
      this.gameId = params['gameid'];
    });
    this._Activatedroute.params.subscribe(params => {
      this.playerId = params['name'];
    });
    this.getGame();
    this.interval = setInterval(() => {
      this.getGame();
      this.currentGame.forEach(element => {
        if (element.GameStatus === 'GS' && element.id === this.gamePlayingId) {
          this.startGame = true;
          this.snackBar.open('Game Has Been Started', 'Thanks', {
            duration: 2000
          });
          clearInterval(this.interval);
        }
      });
      console.log(this.startGame);
    }, 1000);
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    console.log(event);
    console.log('Hello');
    event.preventDefault();
    event.returnValue = ' ';
    alert('By refreshing this page you may loose all data.');
  }

  @HostListener('window:webkitfullscreenchange', ['$event'])
  onFullScreenChange(event) {
    console.log('hiii');
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.key === 'F5') {
      event.preventDefault();
      console.log(event.code);
    }
  }

  getGame() {
    this._playingGameservice
      .getGameWithId(this.gamePlayingId)
      .subscribe(res => {
        this.currentGame = res;
      });
  }

  onGameComplete(abc) {
    this._playingGameservice
      .getGameWithId(this.gamePlayingId)
      .subscribe(res => {
        this.currentGame = res;
        this.currentGame.forEach(element => {
          if (element.id === this.gamePlayingId) {
            element.PlayersJoined.forEach(player => {
              if (player === this.playerId) {
                const a = element.PlayersJoined.indexOf(player);
                element.PlayersScore[a] = abc[1];
                this.score = abc[1];
                element.PlayersSubmittingTime[a] = abc[0];
                this._playingGameservice
                  .UpdateGameEntry(element)
                  .subscribe(res1 => {
                    console.log('game details saved!!! Thank you');
                    this.gameId = '404';
                    this.ShowScore();
                  });
              }
            });
          }
        });
      });
  }

  ShowScore(): void {
    const dialogRef = this.dialog.open(ScoreComponent, {
      width: '300px',
      height: '200px',
      data: {
        myVar: this.playerId,
        score: this.score
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.router.navigateByUrl('playgames');
      console.log(result);
    });
  }
}
