import { Component, OnInit, Injectable, HostListener, OnDestroy } from '@angular/core';
import { Games } from '../games';
import { PlayingGameService } from '../playing-game.service';
import { PlayingGame } from '../playing-game';
import { GlobalServiceService } from '../global-service.service';
import { Query } from '../query';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [PlayingGameService, GlobalServiceService],
  inputs: ['data']
})
export class AdminComponent implements OnInit {
  games: Games[];
  showFiller = true;
  selectedGames: Games;
  gamePlayingId: string;
  newGamePlay: PlayingGame;
  startGameComponent = false;
  question: string;
  query: Query;

  constructor(
    private _gameService: PlayingGameService,
    private _globalService: GlobalServiceService,
    public dialog: MatDialog,
    public router: Router
  ) {}


  ngOnInit() {
    this._globalService.gamesList.subscribe(res => (this.games = res));


  }

@HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {

    console.log("Hello");
    event.preventDefault();
    event.returnValue=" ";
    alert('By refreshing this page you may loose all data.');
}


  onSelectGame(game: any) {
    this.startGameComponent = false;
    this.selectedGames = game;
    console.log(this.selectedGames);
  }

  onGeneratePlayingId(game: any) {
    this.gamePlayingId = Math.floor(Math.random() * 1000000 + 1).toString();

    this.newGamePlay = new PlayingGame();
    this.newGamePlay.id = this.gamePlayingId;
    this.newGamePlay.PlayersScore = [];
    this.newGamePlay.PlayersJoined = [];
    this.newGamePlay.PlayersJoiningTime = [];
    this.newGamePlay.GameStatus = 'NS';
    this.newGamePlay.WinningCriteria = 'LT';
    this.newGamePlay.PlayersSubmittingTime = [];
    this.newGamePlay.StartTime = new Date();
    this.newGamePlay.EndTime = new Date();
    this.newGamePlay.WinnerList = [];
    this.newGamePlay.GameName = this.selectedGames._id;

    if (this.newGamePlay.GameName === '3') {
      this.newGamePlay.QuestionIds = [];
    }

    this._gameService.createNewGameEntry(this.newGamePlay).subscribe(res => {
      console.log('Successfully created new data');
      this.startGameComponent = true;
    });
    console.log(this.gamePlayingId);
  }

  AskQuery() {
    console.log(this.question);
    this.query = new Query();
    this.query.QueryNo = 0;
    this._gameService.getAllQuery().subscribe(res => {
      const queryArray: Array<Query> = res;
      queryArray.forEach(element => {
        console.log(element.QueryNo);
        if (element.QueryNo > this.query.QueryNo) {
          this.query.QueryNo = element.QueryNo;
        }
      });

      console.log('kjkj' + this.query.QueryNo);
      this.query.QueryId = Math.floor(Math.random() * 100000 + 1).toString();
      this.query.QueryNo = this.query.QueryNo + 1;
      this.query.PlayingUsers = [];
      this.query.QueryMsg = this.question;
      this.query.CreatedOn = new Date();
      this.query.UsersResponse = [];
      this._gameService.createNewQuery(this.query).subscribe(res => {
        console.log('Successfully created new Query');
        this.question = '';
      });
      console.log('hii');
    });
  }


  OpenDashboard(): void {
    const dialogRef = this.dialog.open(DashboardComponent, {
      width: '1000px',
      height: '650px',
      data: {
        myVar: 'Admin'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}
