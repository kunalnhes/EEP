import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Question } from './question';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private _getQuestionWithIdUrl =
    'https://ea5q1exkqe.execute-api.us-east-2.amazonaws.com/prod/question';
  private _postQuestionUrl =
    'https://ea5q1exkqe.execute-api.us-east-2.amazonaws.com/prod/question';
  private _getAllQuestionUrl =
    'https://ea5q1exkqe.execute-api.us-east-2.amazonaws.com/prod/question/subquestion';

  constructor(private _http: Http) {}

  addNewQuestion(newQuestion: Question) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http
      .post(this._postQuestionUrl, JSON.stringify(newQuestion), options)
      .pipe(map((response: Response) => response.json()));
  }

  getAllQuestion() {
    return this._http
      .get(this._getAllQuestionUrl)
      .pipe(map((response: Response) => response.json()));
  }
}
