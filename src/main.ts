import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const session = require('express-session');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  setTimeout(() => {
    console.log('Listening server to port: 5000');
  }, 2000);
  await app.listen(5000);
}
bootstrap();

