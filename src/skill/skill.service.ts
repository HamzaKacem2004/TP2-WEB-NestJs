import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  create(dto: CreateSkillDto) {
    const skill = this.skillRepository.create(dto);
    return this.skillRepository.save(skill);
  }

  findAll() {
    return this.skillRepository.find();
  }

  async findOne(id: number) {
    const skill = await this.skillRepository.findOne({ where: { id } });
    if (!skill) {
      throw new NotFoundException('Skill not found');
    }
    return skill;
  }

  async update(id: number, dto: UpdateSkillDto) {
    const skill = await this.findOne(id);
    Object.assign(skill, dto);
    return this.skillRepository.save(skill);
  }

  async remove(id: number) {
    const skill = await this.findOne(id);
    await this.skillRepository.remove(skill);
    return { deleted: true };
  }
}
