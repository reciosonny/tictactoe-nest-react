import { Test, TestingModule } from '@nestjs/testing';
import { ApiSessionController } from './api-session.controller';

describe('ApiSessionController', () => {
  let controller: ApiSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiSessionController],
    }).compile();

    controller = module.get<ApiSessionController>(ApiSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
