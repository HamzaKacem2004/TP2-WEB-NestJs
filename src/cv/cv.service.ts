import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cv } from './entities/cv.entity';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
  ) {}

  async create(dto: CreateCvDto) {
    if (await this.cvRepository.existsBy({ cin: dto.cin })) {
      throw new ConflictException('A cv with this cin already exists');
    }
    const cv = this.cvRepository.create(dto);
    return this.cvRepository.save(cv);
  }

  findAll() {
    return this.cvRepository.find();
  }

  async findOne(id: number) {
    const cv = await this.cvRepository.findOne({ where: { id } });
    if (!cv) {
      throw new NotFoundException('Cv not found');
    }
    return cv;
  }

  async update(id: number, dto: UpdateCvDto) {
    const cv = await this.findOne(id);
    Object.assign(cv, dto);
    return this.cvRepository.save(cv);
  }

  async remove(id: number) {
    const cv = await this.findOne(id);
    await this.cvRepository.remove(cv);
    return { deleted: true };
  }
}
