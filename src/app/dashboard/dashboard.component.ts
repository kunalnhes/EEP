import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PlayingGame } from '../playing-game';
import { GlobalServiceService } from '../global-service.service';
import { PlayingGameService } from '../playing-game.service';
import { Games } from '../games';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'GameName', 'StartTime', 'PlayersJoined'];
  dataSource2: MatTableDataSource<PlayingGame>;
  clickedGame: PlayingGame = new PlayingGame();
  showDetails = false;
  inProgressCount = 0;
  completedCount = 0;
  notStartedCount = 0;
  results: Array<PlayingGame> = [];
  games: Array<Games> = [];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private _gameService: PlayingGameService,
    public dialogRef: MatDialogRef<DashboardComponent>,
    private _globalService: GlobalServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this._gameService.getGameResultList().subscribe(res => {
      console.log('Showing you all the results');
      this.results = res;
      const gamesPlayed: Array<PlayingGame> = res;
      this.dataSource2 = new MatTableDataSource(gamesPlayed);
      this.dataSource2.paginator = this.paginator;
      this.dataSource2.sort = this.sort;

      this.results.forEach(element => {
        if (element.GameStatus === 'NS') {
          this.notStartedCount += 1;
        } else if (element.GameStatus === 'GS') {
          this.inProgressCount += 1;
        } else if (element.GameStatus === 'GE') {
          this.completedCount += 1;
        }
      });
    });
  }

  ngOnInit() {
    this._globalService.gamesList.subscribe(res => (this.games = res));
  }

  applyFilter(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  GameClicked(abc) {
    console.log(abc);
    this._gameService.getGameWithId(abc).subscribe(res => {
      res.forEach(element => {
        this.clickedGame = element;
        console.log(this.clickedGame);
        this.showDetails = true;
      });
    });
  }



  FindWinner(gameToFindWinner: PlayingGame) {
    this._gameService.getGameWithId(gameToFindWinner.id).subscribe(res => {
      res.forEach(element => {
        if (element.id === gameToFindWinner.id) {
          element.GameStatus = 'GE';
          element.EndTime = new Date();
          if (element.GameName === '2' || element.GameName === '4') {
            for (let i = 0; i < element.PlayersJoined.length; i++) {
              element.WinnerList.push(i);
            }
            element.WinnerList.sort(function(a, b) {
              if (element.PlayersScore[a] > element.PlayersScore[b]) {
                return 1;
              } else if (element.PlayersScore[a] < element.PlayersScore[b] || element.PlayersScore[b] === 0) {
                return -1;
              } else {
                return 0;
              }
            });
          } else if ( element.GameName === '3') {
            for (let i = 0; i < element.PlayersJoined.length; i++) {
              element.WinnerList.push(i);
            }
            element.WinnerList.sort(function(a, b) {
              if (element.PlayersScore[a] < element.PlayersScore[b]) {
                return 1;
              } else if (element.PlayersScore[a] > element.PlayersScore[b]) {
                return -1;
              } else {
                return 0;
              }
            });
          }
          console.log('winner calculated. Winner is being stored in database');
          setTimeout(() => {
            this._gameService
              .UpdateGameEntry(element)
              .subscribe(res1 => {
                console.log('Game ended')});
            console.log('pushed');
          }, 4000);
        }
      });
    });
  }
}
