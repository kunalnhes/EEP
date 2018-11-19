import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { Games } from '../games';

@Component({
  selector: 'game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
  inputs: ['games'],
  outputs: ['SelectGame']
})
export class GameListComponent implements OnInit {

  @Input() games: Array<Games>;

  public SelectGame = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSelectGame(game:Games){
    this.SelectGame.emit(game);
  }

}
