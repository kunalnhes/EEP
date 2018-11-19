import { Component, OnInit } from '@angular/core';
import { PlayingGameService } from '../playing-game.service';
import { Query } from '../query';
import { element } from '../../../node_modules/@angular/core/src/render3/instructions';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})
export class QueriesComponent implements OnInit {

  query:Query=new Query();
  usersAvailable:Array<string>;
  usersResponse:Array<string>;
  constructor(private _playingGameservice:PlayingGameService) { }

  currentQuestion:string;
  userResponse:string;
  userId:string;

  ngOnInit() {
    this._playingGameservice.getAllQuery().subscribe(res => {
      var queries:Array<Query>=res;
      this.query.QueryNo=0;
      queries.forEach(element => {
        if(element.QueryNo>this.query.QueryNo){
          this.query=element;
          this.currentQuestion=this.query.QueryMsg;
          this.usersAvailable=this.query.PlayingUsers;
          this.usersResponse=this.query.UsersResponse;
        }
      });
    });
  }

  SubmitResponse(){
    if(this.userId!="" && this.userResponse!=""){
      this.query.PlayingUsers.push(this.userId);
      this.query.UsersResponse.push(this.userResponse);
      this.usersAvailable=this.query.PlayingUsers;
      this.usersResponse=this.query.UsersResponse;
      this._playingGameservice.updateQueryQithQueryId(this.query).subscribe(res=>{
        this.userId="";
        this.userResponse="";
        this.ngOnInit();
      });

    }
  }

}
