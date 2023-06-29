import { Test, TestingModule } from '@nestjs/testing';
import { TaskschedulesService } from './taskschedules.service';

describe('TaskschedulesService', () => {
  let service: TaskschedulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskschedulesService],
    }).compile();

    service = module.get<TaskschedulesService>(TaskschedulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
