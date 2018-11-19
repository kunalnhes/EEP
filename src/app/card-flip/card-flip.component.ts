import { Component, OnInit, EventEmitter } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'card-flip',
  templateUrl: './card-flip.component.html',
  styleUrls: ['./card-flip.component.css'],
  outputs: ['gameComplete']
})
export class CardFlipComponent implements OnInit {
  constructor(
    public dialog: MatDialog
  ) {}

    dialogRef = this.dialog.open(CardFlipInstructionComponent, {
      width: '500px'
    });
  public gameComplete = new EventEmitter();

  memory_array = [
    'A',
    'A',
    'B',
    'B',
    'C',
    'C',
    'D',
    'D',
    'E',
    'E',
    'F',
    'F',
    'G',
    'G',
    'H',
    'H',
    'I',
    'I',
    'J',
    'J',
    'K',
    'K',
    'L',
    'L'
  ];
  memory_values = [];
  inner_html_content = [];
  background = [];
  memory_tile_ids = [];
  tiles_flipped = 0;
  counter = 0;
  status = 'Running';
  au: any;
  timer;

  ngOnInit() {
    this.dialogRef.afterClosed().subscribe(result => {
      this.shuffleTile();
    this.timer = setInterval(() => {
      this.counter += 1;
    }, 1000);
    });

  }

  shuffleTile() {
    var i = this.memory_array.length,
      j,
      temp;
    while (--i > 0) {
      j = Math.floor(Math.random() * (i + 1));
      temp = this.memory_array[j];
      this.memory_array[j] = this.memory_array[i];
      this.memory_array[i] = temp;
      this.inner_html_content[i] = '';
    }
    this.inner_html_content[i] = '';
  }

  flipTile(ar, pos) {
    console.log(this.inner_html_content[pos]);
    console.log(this.memory_values.length);
    if (this.inner_html_content[pos] == '' && this.memory_values.length < 2) {
      this.background[pos] = '#FFF';
      this.inner_html_content[pos] = this.memory_array[pos];
      if (this.memory_values.length == 0) {
        this.memory_values.push(this.memory_array[pos]);
        this.memory_tile_ids.push(pos);
      } else if (this.memory_values.length == 1) {
        this.memory_values.push(this.memory_array[pos]);
        this.memory_tile_ids.push(pos);
        if (this.memory_values[0] == this.memory_values[1]) {
          this.tiles_flipped += 2;
          this.memory_values = [];
          this.memory_tile_ids = [];
          if (this.tiles_flipped == this.memory_array.length) {
            console.log('Winner');
            clearInterval(this.timer);
            this.status = 'Completed';
            this.au = document.getElementById('cheers');
            this.au.play();
            var output = [new Date(), this.counter];
            this.gameComplete.emit(output);
          }
        } else {
          setTimeout(() => {
            this.flip2Back();
          }, 400);
        }
      }
    }
  }

  flip2Back() {
    this.background[this.memory_tile_ids[0]] = 'rgb(243, 182, 182)';
    this.inner_html_content[this.memory_tile_ids[0]] = '';
    this.background[this.memory_tile_ids[1]] = 'rgb(243, 182, 182)';
    this.inner_html_content[this.memory_tile_ids[1]] = '';
    this.memory_values = [];
    this.memory_tile_ids = [];
  }
}

@Component({
  selector: 'card-flip-instructions',
  templateUrl: './card-flip.instructions.html',
})
export class CardFlipInstructionComponent {

  constructor() {}


}
