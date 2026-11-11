import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- AJOUT
import { Skill } from './entities/skill.entity'; // <-- AJOUT

@Module({
  imports: [TypeOrmModule.forFeature([Skill])], // <-- LA LIGNE CRUCIALE
  controllers: [SkillController],
  providers: [SkillService],
})
export class SkillModule {}