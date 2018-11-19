import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Games } from './games';

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {
  private games: Games[] = [
    {
      _id: '1',
      name: 'Simple Query',
      url: 'assets/image/simplequery.png',
      description: 'Description of Simple Query game.'
    },
    {
      _id: '2',
      name: 'Card Flip',
      url: 'assets/image/cardflip.png',
      description: 'Description of Card Flip game. A memory game.'
    },
    {
      _id: '3',
      name: 'Quiz Game',
      url: 'assets/image/quiz.png',
      description: 'Description of Quiz Game game.'
    },
    {
      _id: '4',
      name: '8 Puzzle Game',
      url: 'assets/image/cardflip.png',
      description: 'Description of 8 Puzzle game.'
    }
  ];

  private behaviour = new BehaviorSubject(this.games);
  gamesList = this.behaviour.asObservable();
  constructor() {}
}
