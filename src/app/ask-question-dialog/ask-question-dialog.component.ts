import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '../../../node_modules/@angular/material';
import { Question } from '../question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-ask-question-dialog',
  templateUrl: './ask-question-dialog.component.html',
  styleUrls: ['./ask-question-dialog.component.css']
})
export class AskQuestionDialogComponent implements OnInit {
  QuestionObject: Question;
  q = '';
  questionId: string;
  constructor(
    private _service: QuestionService,
    public dialogRef: MatDialogRef<AskQuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.QuestionObject = new Question();
    this.QuestionObject.QuestionName = '';
    this.QuestionObject.Answer = '';
    this.QuestionObject.Options = ['', '', '', ''];
    this.QuestionObject.QuestionId = '0';
  }
  onAskClick(qo: Question) {
    this._service.getAllQuestion().subscribe(res => {
      console.log(res);
      console.log(res.length);
      this.questionId = (res.length + 1);
      console.log(this.questionId);
      this.QuestionObject.Answer = 'nil';
      this.QuestionObject.Options = ['nil', 'nil', 'nil', 'nil'];
      this.QuestionObject.QuestionId = this.questionId.toString();
      this.dialogRef.close(this.QuestionObject);
    });
  }
}
