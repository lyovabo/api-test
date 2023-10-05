import { Test, TestingModule } from '@nestjs/testing';
import { RatsService } from './rats.service';

describe('CatsService', () => {
  let service: RatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RatsService],
    }).compile();

    service = module.get<RatsService>(RatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
