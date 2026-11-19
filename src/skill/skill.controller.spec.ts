import { Test, TestingModule } from '@nestjs/testing';
import { SkillController } from './skill.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SkillService } from './skill.service';
import { Skill } from './entities/skill.entity';

describe('SkillController', () => {
  let controller: SkillController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillController],
      providers: [SkillService, { provide: getRepositoryToken(Skill), useValue: {} }],
    }).compile();

    controller = module.get<SkillController>(SkillController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
