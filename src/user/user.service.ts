import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    await this.ensureUnique(dto.username, dto.email);
    const user = this.userRepository.create({
      ...dto,
      password: await hash(dto.password, 10),
    });
    const saved = await this.userRepository.save(user);
    return this.findOne(saved.id);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findOne(id);
    await this.ensureUnique(dto.username, dto.email, id);
    Object.assign(user, dto);
    if (dto.password) {
      user.password = await hash(dto.password, 10);
    }
    await this.userRepository.save(user);
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return { deleted: true };
  }

  private async ensureUnique(username?: string, email?: string, exceptId?: number) {
    const where: FindOptionsWhere<User>[] = [];
    if (username) where.push({ username });
    if (email) where.push({ email });
    if (where.length === 0) return;
    const existing = await this.userRepository.findOne({ where });
    if (existing && existing.id !== exceptId) {
      throw new ConflictException('Username or email already used');
    }
  }
}
