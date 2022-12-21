import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { ApiSessionController } from './api-session/api-session.controller';

@Module({
  imports: [],
  controllers: [AppController, CatsController, ApiSessionController],
  providers: [AppService],
})
export class AppModule {}
