
import {
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class CreateCvDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsInt()
  @Min(18)
  @Max(100)
  age: number;

  @IsString()
  @IsNotEmpty()
  cin: string;

  @IsString()
  @IsNotEmpty()
  job: string;

  @IsString()
  @IsNotEmpty()
  path: string;
}
