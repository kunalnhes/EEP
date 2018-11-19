import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { PlayingGame } from './playing-game';
import { Query } from './query';

@Injectable({
  providedIn: 'root'
})
export class PlayingGameService {
  private _getUrl =
    'https://ea5q1exkqe.execute-api.us-east-2.amazonaws.com/prod/games';
  private _postUrl =
    'https://ea5q1exkqe.execute-api.us-east-2.amazonaws.com/prod/games';
  private _putUrl =
    'https://ea5q1exkqe.execute-api.us-east-2.amazonaws.com/prod/games';
  private _postUrlWithId =
    'https://ea5q1exkqe.execute-api.us-east-2.amazonaws.com/prod/play-games';
  private _getQueryUrl =
    'https://ea5q1exkqe.execute-api.us-east-2.amazonaws.com/prod/queries';
  private _postQueryUrl =
    'https://ea5q1exkqe.execute-api.us-east-2.amazonaws.com/prod/queries';
  private _putQueryUrl =
    'https://ea5q1exkqe.execute-api.us-east-2.amazonaws.com/prod/queries';
  constructor(private _http: Http) {}

  getGameResultList() {
    return this._http
      .get(this._getUrl)
      .pipe(map((response: Response) => response.json()));
  }

  createNewGameEntry(newGame: PlayingGame) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http
      .post(this._postUrl, JSON.stringify(newGame), options)
      .pipe(map((response: Response) => response.json()));
  }

  UpdateGameEntry(newGame: PlayingGame) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http
      .post(this._putUrl, JSON.stringify(newGame), options)
      .pipe(map((response: Response) => response.json()));
  }

  getGameWithId(gameId: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http
      .post(this._postUrlWithId, JSON.stringify({ id: gameId }), options)
      .pipe(map((response: Response) => response.json()));
  }

  createNewQuery(query: Query) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http
      .post(this._postQueryUrl, JSON.stringify(query), options)
      .pipe(map((response: Response) => response.json()));
  }

  updateQueryQithQueryId(query: Query) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http
      .post(this._putQueryUrl, JSON.stringify(query), options)
      .pipe(map((response: Response) => response.json()));
  }

  getAllQuery() {
    return this._http
      .get(this._getQueryUrl)
      .pipe(map((response: Response) => response.json()));
  }
}
