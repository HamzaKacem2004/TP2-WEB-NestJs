import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateCvDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsInt()
  @Min(0)
  age: number;

  @IsString()
  @IsNotEmpty()
  cin: string;

  @IsString()
  @IsNotEmpty()
  job: string;

  @IsOptional()
  @IsString()
  path?: string;
}
