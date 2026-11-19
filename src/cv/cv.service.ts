import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cv } from './entities/cv.entity';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { ConnectedUser } from '../auth/interfaces/jwt-payload.interface';
import { Role } from '../auth/enums/role.enum';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
  ) {}

  async create(dto: CreateCvDto, user: ConnectedUser) {
    if (await this.cvRepository.existsBy({ cin: dto.cin })) {
      throw new ConflictException('A cv with this cin already exists');
    }
    const cv = this.cvRepository.create({ ...dto, user: { id: user.id } });
    return this.cvRepository.save(cv);
  }

  findAll(user: ConnectedUser) {
    if (user.role === Role.ADMIN) {
      return this.cvRepository.find();
    }
    return this.cvRepository.find({ where: { user: { id: user.id } } });
  }

  async findOne(id: number) {
    const cv = await this.cvRepository.findOne({ where: { id } });
    if (!cv) {
      throw new NotFoundException('Cv not found');
    }
    return cv;
  }

  async update(id: number, dto: UpdateCvDto, user: ConnectedUser) {
    const cv = await this.findOwnedCv(id, user);
    Object.assign(cv, dto);
    return this.cvRepository.save(cv);
  }

  async remove(id: number, user: ConnectedUser) {
    const cv = await this.findOwnedCv(id, user);
    await this.cvRepository.remove(cv);
    return { deleted: true };
  }

  private async findOwnedCv(id: number, user: ConnectedUser) {
    const cv = await this.findOne(id);
    if (cv.user?.id !== user.id) {
      throw new ForbiddenException('You can only modify your own cvs');
    }
    return cv;
  }
}
