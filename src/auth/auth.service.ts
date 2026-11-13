import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import { User } from '../user/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.userRepository.findOne({
      where: [{ username: dto.username }, { email: dto.email }],
    });
    if (exists) {
      throw new ConflictException('Username or email already used');
    }

    const hashedPassword = await hash(dto.password, 10);

    const user = this.userRepository.create({
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
    });
    const saved = await this.userRepository.save(user);

    return this.withoutPassword(saved);
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { username: dto.username },
      select: { id: true, username: true, password: true, role: true },
    });

    if (!user || !(await compare(dto.password, user.password))) {
      throw new UnauthorizedException('Wrong username or password');
    }

    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  private withoutPassword(user: User) {
    const { password: _password, ...rest } = user;
    return rest;
  }
}
