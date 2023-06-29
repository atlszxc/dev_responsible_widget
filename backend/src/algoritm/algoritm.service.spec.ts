import { Test, TestingModule } from '@nestjs/testing';
import { AlgoritmService } from './algoritm.service';

describe('AlgoritmService', () => {
  let service: AlgoritmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlgoritmService],
    }).compile();

    service = module.get<AlgoritmService>(AlgoritmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
