import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as screenfull from 'screenfull';

@Component({
  selector: 'app-score-dialog',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ScoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}
  CloseDialog() {
    if (screenfull.enabled) {
      if (screenfull.isFullscreen) {
        screenfull.exit();
      }
    }
    this.dialogRef.close('closed');
  }
}
