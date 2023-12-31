import { Test, TestingModule } from '@nestjs/testing';
import { SkillRequestsService } from './skill-requests.service';

describe('RequestsService', () => {
  let service: SkillRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkillRequestsService],
    }).compile();

    service = module.get<SkillRequestsService>(SkillRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
