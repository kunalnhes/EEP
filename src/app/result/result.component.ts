import { Component, OnInit } from '@angular/core';
import { PlayingGameService } from '../playing-game.service';
import { PlayingGame } from '../playing-game';

@Component({
  selector: 'result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  providers: [PlayingGameService]
})
export class ResultComponent implements OnInit {

  constructor(private _gameService: PlayingGameService) { }

  public results:Array<PlayingGame>;

  ngOnInit() {
    this._gameService.getGameResultList().subscribe(res => {
      this.results=res;
      console.log(this.results);
      console.log("Showing you all the results");
    });
  }

}
