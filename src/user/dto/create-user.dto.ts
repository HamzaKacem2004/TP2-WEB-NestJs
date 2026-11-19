import { IsEnum, IsOptional } from 'class-validator';
import { RegisterDto } from '../../auth/dto/register.dto';
import { Role } from '../../auth/enums/role.enum';

export class CreateUserDto extends RegisterDto {
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
