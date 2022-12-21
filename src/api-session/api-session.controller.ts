
import { Controller } from '@nestjs/common';
import { Get, Param, Post, Req, Res } from '@nestjs/common/decorators';
import Players from 'src/models/PlayersEnum';
import { checkWinner } from 'src/utils/gameUtils';

// @ts-ignore
interface IUserRequest extends Request {
  selected: string,
  body: {
    selected: string
  }
};


@Controller('api/session')
export class ApiSessionController {

  private defaultPlayerSelection: Players;
  private startGame: boolean = false;
  private otherPlayerTurn: boolean = false;
  private scorePlayerOne: number;
  private scorePlayerTwo: number;

  private board: any[] = new Array(9);

  @Post('/')
  startNormalSession(@Req() request: IUserRequest): any {

    this.startGame = true;

    return 'Game started!!!';
  }

  @Post('/players/selectcross')
  async setNewPlayerAsCross() {
    this.defaultPlayerSelection = Players.Cross;

    this.board = [];
    this.otherPlayerTurn = false;

    return `${Players.Cross} is selected`;
  }

  @Post('/players/selectnaught')
  async setNewPlayerAsNaught() {
    this.defaultPlayerSelection = Players.Naught;

    this.board = [];
    this.otherPlayerTurn = false;


    return `${Players.Naught} is selected`;
  }
  
  // Use this as reference for the game whether to immediately start or go to selection page
  @Get('/currentsession')
  async getCurrentSession(@Req() req: any) {

    const hasWinner = checkWinner(this.board, this.defaultPlayerSelection);
    let playerWinner;

    if (hasWinner) {
      if (!this.otherPlayerTurn) {
        playerWinner = 'PLAYER ONE';
        this.scorePlayerOne += this.scorePlayerOne;
      } else {
        playerWinner = 'PLAYER TWO';
        this.scorePlayerTwo += this.scorePlayerTwo;
      }      
    }
    
    return { currentPlayer: this.defaultPlayerSelection, board: this.board, startGame: this.startGame, hasWinner, playerWinner };
  }

  @Post('/players/setanothermatch')
  async setAnotherMatch(@Param('idx') idx: number) {

    this.board[idx] = this.defaultPlayerSelection; //store current player selection to board first then switch to other player selection (either X or O) 
    return 'Success!!';
  }

  @Post('/players/addtoboard/:idx')
  async addToBoard(@Param('idx') idx: number) {

    this.board[idx] = this.defaultPlayerSelection; //store current player selection to board first then switch to other player selection (either X or O) 
    return 'Success!!';
  }

  @Post('/players/setotherplayerturn')
  async setOtherPlayerTurn() {
    this.defaultPlayerSelection = this.defaultPlayerSelection === Players.Cross ? Players.Naught : Players.Cross;
    this.otherPlayerTurn = !this.otherPlayerTurn;

    return { currentPlayer: this.defaultPlayerSelection, otherPlayerTurn: this.otherPlayerTurn };
  }


  @Get()
  get(): string {
    return 'User session';
  }


}
