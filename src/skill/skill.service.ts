
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity.js';
import { CreateSkillDto } from './dto/create-skill.dto.js';
import { UpdateSkillDto } from './dto/update-skill.dto.js';

@Injectable()
export class SkillService {

  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}

    create(createSkillDto: CreateSkillDto) {
    return this.skillRepository.save(createSkillDto);
    }

    update(id: number, updateSkillDto: UpdateSkillDto) {
    return this.skillRepository.update(id, updateSkillDto);
    }

  findAll() {
    return this.skillRepository.find();
  }

  findOne(id: number) {
    return this.skillRepository.findOneBy({ id });
  }

  

  remove(id: number) {
    return this.skillRepository.delete(id);
  }
}
