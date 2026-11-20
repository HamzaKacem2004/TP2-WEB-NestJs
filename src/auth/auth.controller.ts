import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Auth } from './decorators/auth.decorator';
import { User } from './decorators/user.decorator';
import { Role } from './enums/role.enum';
import type { ConnectedUser } from './interfaces/jwt-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Auth()
  @Get('profile')
  profile(@User() user: ConnectedUser) {
    return user;
  }

  @Auth(Role.ADMIN)
  @Get('admin')
  adminOnly(@User() user: ConnectedUser) {
    return { message: 'Welcome admin', user };
  }
}
