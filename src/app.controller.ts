import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  private testVar = '';
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello() + 'asdqwe';
  }

  @Get('/master')
  master(@Req() request: any): string {

    // @ts-ignore
    request.session.visits = request.session.visits ? request.session.visits + 1 : 1;

    setTimeout(() => {
      this.testVar = '';
    }, 2000);
    
    // @ts-ignore
    return this.testVar;
  }

  @Post('/testsession')
  testSession(@Req() request: any): string {

    this.testVar = 'Session is set!'
    // @ts-ignore
    return request.session;
  }
  


}
