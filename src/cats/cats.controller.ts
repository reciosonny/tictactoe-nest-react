import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {


  @Get()
  get(): string {
    return 'meow!!';
  }

  @Get('/scratch')
  scratch(): string {
    return 'damage!!!';
  }



}
