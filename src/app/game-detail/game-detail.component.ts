import { PlayingGame } from './../playing-game';
import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { Games } from '../games';
import { concat } from '../../../node_modules/rxjs';

@Component({
  selector: 'game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css'],
  inputs: ['game'],
  outputs: ['generatePlayingId']
})
export class GameDetailComponent implements OnInit {
  @Input()
  game: Games;

  @Input() newGamePlay: PlayingGame;
  @Input() gamePlayingId: string;
  @Input() startGameComponent: boolean;

  constructor() {}

  public generatePlayingId = new EventEmitter();

  ngOnInit() {}

  generateId(game: Games) {
    this.generatePlayingId.emit(game);
  }
}
