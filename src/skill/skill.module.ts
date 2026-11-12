
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity.js';
import { SkillService } from './skill.service.js';
import { SkillController } from './skill.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Skill])],
  controllers: [SkillController],
  providers: [SkillService],
})
export class SkillModule {}
