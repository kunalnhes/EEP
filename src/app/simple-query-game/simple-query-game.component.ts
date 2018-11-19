import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { QuestionService } from '../question.service';
import { PlayingGameService } from '../playing-game.service';
import { PlayingGame } from '../playing-game';
import { Question } from '../question';

@Component({
  selector: 'app-simple-query-game',
  templateUrl: './simple-query-game.component.html',
  styleUrls: ['./simple-query-game.component.css'],
  outputs:['gameComplete']
})
export class SimpleQueryGameComponent implements OnInit {

  @Input() gamePlayingId: string;

  public gameComplete= new EventEmitter();
  quesId: Array<string>;
  questions: Array<Question>=[];
  questionResponse:Array<string>=[];
  game:PlayingGame;

  constructor(private _questionService: QuestionService,private _playingService: PlayingGameService) { }

  ngOnInit() {
    
    this._playingService.getGameWithId(this.gamePlayingId).subscribe(res => {
      res.forEach(element => {
        this.game = element;
        this.quesId = this.game.QuestionIds;
        this.quesId.forEach(ele => { this.questionResponse.push(' ')});
        this._questionService.getAllQuestion().subscribe(res1 => {
          const temp = res1;
          temp.forEach(element => { 
          if(this.quesId.indexOf(element.QuestionId.toString()) != -1){
            this.questions.push(element);
            console.log(element);
          }
          });
        });
      });
    });
  }

  CalculateScore(){
        var output=[new Date(),this.questionResponse];
        this.gameComplete.emit(output);
  }

}
