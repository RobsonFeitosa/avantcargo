import { Test, TestingModule } from '@nestjs/testing';
import { ComexSystemsService } from './comex-systems.service';

describe('ComexSystemsService', () => {
  let service: ComexSystemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComexSystemsService],
    }).compile();

    service = module.get<ComexSystemsService>(ComexSystemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
