import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { QuestionService } from '../question.service';
import { PlayingGameService } from '../playing-game.service';
import { Games } from '../games';
import { PlayingGame } from '../playing-game';
import { Question } from '../question';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.css'],
  outputs:['gameComplete']
})
export class QuizQuestionComponent implements OnInit {

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
        this.quesId.forEach(ele => { this.questionResponse.push('0')});
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
    let score=0;
    let counter=0;
    for (let i = 0; i < this.questions.length; i++){
      console.log(this.questions[i].Answer );
      console.log(this.questionResponse[i]);
      console.log((this.questions[i].Answer == this.questionResponse[i]));
      if(this.questions[i].Answer == this.questionResponse[i]){
        score = score+1;
      }
      counter = counter+1;
      console.log("checked");
      console.log((counter == this.questions.length));
      if(counter == this.questions.length){
        var output=[new Date(),score];
        this.gameComplete.emit(output);
      }

  }

  
  }

}
