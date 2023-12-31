import { Test, TestingModule } from '@nestjs/testing';
import { SkillRequestsController } from './skill-requests.controller';

describe('RequestsController', () => {
  let controller: SkillRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillRequestsController],
    }).compile();

    controller = module.get<SkillRequestsController>(SkillRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
