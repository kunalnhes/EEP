export class PlayingGame {
  id: string;
  PlayersJoined: Array<string> = [];
  PlayersJoiningTime: Array<Date> = [];
  PlayersScore: Array<string> = [];
  PlayersSubmittingTime: Array<Date> = [];
  GameStatus: string;
  WinningCriteria: string;
  EndTime: Date;
  StartTime: Date;
  GameName: string;
  QuestionIds: Array<string> = [];
  WinnerList: Array<number> = [];
}
