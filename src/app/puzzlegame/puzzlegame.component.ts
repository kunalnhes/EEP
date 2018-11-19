import { Component, OnInit, HostListener, EventEmitter } from '@angular/core';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  S_KEY = 83
}
@Component({
  selector: 'app-puzzlegame',
  templateUrl: './puzzlegame.component.html',
  styleUrls: ['./puzzlegame.component.css'],
  outputs:['gameComplete']
})

export class PuzzlegameComponent implements OnInit {
  canvas: any;
  au: any;
  ctx: CanvasRenderingContext2D ;
  empty: number;
  counter: number=0;
  ar: number[] = [];
  im: number[] = [];
  restart: number;
  timer: any;
  public gameComplete= new EventEmitter();

  constructor() { }

  ngOnInit() {
   this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
   this.ctx = this.canvas.getContext('2d');
   this.ctx.font = '30px Arial';
   this.ctx.fillText('Hit S to start the game', 0, 80);
   this.empty = 9;
   this.restart = 0;
   this.ar = [1, 2, 3, 4, 5, 6, 7, 8, 0];
   this.im = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 0]);
   while ( this.im === undefined) {
    this.im = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 0]);
   }
   for (let i = 0; i <= 8; i++) {
    if ( this.im[i] === 0) {
      this.empty = i + 1; }
    }
  }
  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    if (this.isSolvable(array)) {
      console.log('true');
    return array;
    } else {
      console.log('false');
      this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 0]);
    }
}



  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      event.preventDefault();
      this.moveright();
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      event.preventDefault();
      this. moveleft();
    }
    if (event.keyCode === KEY_CODE.UP_ARROW) {
      event.preventDefault();

      this.moveup();
    }

    if (event.keyCode === KEY_CODE.DOWN_ARROW) {
      event.preventDefault();
      this.movedown();
    }
    if (event.keyCode === KEY_CODE.S_KEY) {
      event.preventDefault();
      this.start();
      this.timer=setInterval( () => { 
        this.counter += 1; 
        }, 1000);
    }
  }
  moveup() {
    console.log('up');
    this.ctx.clearRect(0, 0, 300, 300);
    if (this.restart === 1) {
      this.draw();
      return;
      }
      if ( this.empty === 9 || this.empty === 7 || this.empty === 8) {
        this.au = document.getElementById('no');
        this.au.play();
        this.draw();
      } else {
        this.au = document.getElementById('cut');
        this.au.play();
        const text = 'puzz';
        const curr = this.empty;
        this.empty = this.empty + 3;
        const next = this.empty;
          this.im[curr - 1] = this.im[next - 1];
          this.im[next - 1] = 0;
          this.draw();
      }
      console.log(this.empty);
  }
  movedown() {
    this.ctx.clearRect(0, 0, 300, 300);
    if ( this.restart === 1) {
      this.draw();
    return;
    }
    if ( this.empty === 1 || this.empty === 2 || this.empty === 3) {
      this.au = document.getElementById('no');
      this.au.play();
      this.draw();
      } else {
        this.au = document.getElementById('cut');
        this.au.play();
        const text = 'puzz';
        const curr = this.empty;
        this.empty = this.empty - 3;
        const next = this.empty;
        this.im[curr - 1] = this.im[next - 1];
        this.im[next - 1] = 0;
        this.draw();

      }

      console.log(this.empty);

  }


  moveleft() {
    this.ctx.clearRect(0, 0, 300, 300);

    if ( this.restart === 1) {
      this.draw();
    return;
    }

    if ( this.empty === 6 || this.empty === 9 || this.empty === 3) {
      this.au = document.getElementById('no');
      this.au.play();
      this.draw();
        } else {
          this.au = document.getElementById('cut');
          this.au.play();
          const text = 'puzz';
          const curr = this.empty;
          this.empty = this.empty + 1;
          const next = this.empty;
          this.im[curr - 1] = this.im[next - 1];
          this.im[next - 1] = 0;
          this.draw();
        }
      console.log(this.empty);
  }

  moveright() {
    this.ctx.clearRect(0, 0, 300, 300);
    if ( this.restart === 1 ) {
      this.draw();
    return;
    }
      if ( this.empty === 1 || this.empty === 4 || this.empty === 7) {
        this.au = document.getElementById('no');
        this.au.play();
        this.draw();
        } else {
          this.au = document.getElementById('cut');
          this.au.play();
          const text = 'puzz';
          const curr = this.empty;
          this.empty = this.empty - 1;
          const next = this.empty;
          this.im[curr - 1] = this.im[next - 1];
          this.im[next - 1] = 0;
          this.draw();
        }console.log(this.empty);

      }


  start() {
    this.draw();
  }
  draw() {
    const mov = document.getElementById('moves');
    mov.innerHTML = 'MOVES: ' + this.counter.toString();
    const m = document.getElementById('message');
    m.innerHTML = '';
    let t;
    t = 0;
    if (this.restart === 1) {

      this.im = this.shuffle ([1, 2, 3, 4, 5, 6, 7, 8, 0]);
      for (let j = 0; j <= 8; j++) {
        if ( this.im[j] === 0) {
          this.empty = j + 1;
        }
      }
      console.log(this.empty);

     this.ctx.clearRect(0, 0, 300, 300);
      this.restart = 0;
    }
    for (let i = 0; i < 9 ; i++) {
      if ( this.im[i] !== this.ar[i]) {
        t = 1; }
    }
    console.log(this.im);
    console.log(this.ar);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.component(i, j);
      }
    }
    console.log(t);

    if (t === 0) {
      console.log('one more');
      this.won();
    }
  }
  won() {
    this.ctx.clearRect(200, 200, 100, 100);
     const img = <HTMLCanvasElement>document.getElementById('puzz9');

    const pat = this.ctx.createPattern(img, 'repeat');
    this.ctx.fillStyle = pat;
    this.ctx.fillRect(200, 200, 100, 100);
    
    clearInterval(this.timer);
    console.log('won');
    this.au = document.getElementById('cheers');
    this.au.play();
    this.restart = 1;
    var output=[new Date(),this.counter];
    this.gameComplete.emit(output);
  }


  component(x, y) {
    let text = 'puzz';
    let z = x + 3 * y;
    z = this.im[z];
    text = text + z.toString();
    if ( z !== 0) {
    const img = <HTMLCanvasElement>document.getElementById(text);
    const pat = this.ctx.createPattern( img , 'repeat');
      this.ctx.fillStyle = pat;
    } else {
      this.ctx.fillStyle = 'white';
    }

    this.ctx.fillRect(100 * x, 100 * y, 99.5, 99.5);
  }

  isSolvable(puzzle) {
  const invCount = this.getInvCount(puzzle);

    // return true if inversion count is even.
    return (invCount % 2 === 0);
  }
getInvCount(arr) {
    let inv_count = 0;
    for (let i = 0; i < 9 - 1; i++) {
        for (let j = i + 1; j < 9; j++) {
             // Value 0 is used for empty space
             if (arr[j] && arr[i] &&  arr[i] > arr[j]) {
                  inv_count++;
                }
          }
      }
    return inv_count;
  }
}

