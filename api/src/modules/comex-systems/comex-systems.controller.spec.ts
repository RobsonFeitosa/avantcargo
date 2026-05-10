import { Test, TestingModule } from '@nestjs/testing';
import { ComexSystemsController } from './comex-systems.controller';

describe('ComexSystemsController', () => {
  let controller: ComexSystemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComexSystemsController],
    }).compile();

    controller = module.get<ComexSystemsController>(ComexSystemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
