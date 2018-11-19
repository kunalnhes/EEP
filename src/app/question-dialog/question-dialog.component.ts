import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '../../../node_modules/@angular/material';
import { Question } from '../question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.css']
})
export class QuestionDialogComponent implements OnInit {
  QuestionObject: Question;
  q = '';
  questionId: string;
  constructor(
    private _service: QuestionService,
    public dialogRef: MatDialogRef<QuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.QuestionObject = new Question();
    this.QuestionObject.QuestionName = '';
    this.QuestionObject.Answer = '';
    this.QuestionObject.Options = ['', '', '', ''];
    this.QuestionObject.QuestionId = '9';
  }
  onAddClick(qo: Question) {
    this._service.getAllQuestion().subscribe(res => {
      console.log(res);
      console.log(res.length);
      this.questionId = (res.length + 1);
      console.log(this.questionId);
      this.QuestionObject.QuestionId = this.questionId.toString();
      this.dialogRef.close(this.QuestionObject);
    });
  }
}
