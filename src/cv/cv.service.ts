
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cv } from './entities/cv.entity.js';
import { CreateCvDto } from './dto/create-cv.dto.js';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
  ) {}

  // Ajouter un CV
  async create(createCvDto: CreateCvDto) {
    const cv = this.cvRepository.create(createCvDto);
    return await this.cvRepository.save(cv);
  }

  // Récupérer tous les CV
  async findAll() {
    return await this.cvRepository.find();
  }

  // Récupérer un CV par son ID
  async findOne(id: number) {
    const cv = await this.cvRepository.findOneBy({ id });

    if (!cv) {
      throw new NotFoundException('CV introuvable');
    }

    return cv;
  }

  // Modifier un CV
  async update(id: number, updateCvDto: Partial<CreateCvDto>) {
    const cv = await this.findOne(id);

    Object.assign(cv, updateCvDto);

    return await this.cvRepository.save(cv);
  }

  // Supprimer un CV
  async remove(id: number) {
    const cv = await this.findOne(id);

    return await this.cvRepository.remove(cv);
  }
}
