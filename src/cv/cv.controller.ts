import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from '../auth/decorators/user.decorator';
import type { ConnectedUser } from '../auth/interfaces/jwt-payload.interface';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Auth()
  @Post()
  create(@Body() createCvDto: CreateCvDto, @User() user: ConnectedUser) {
    return this.cvService.create(createCvDto, user);
  }

  @Auth()
  @Get()
  findAll(@User() user: ConnectedUser) {
    return this.cvService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cvService.findOne(id);
  }

  @Auth()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCvDto: UpdateCvDto,
    @User() user: ConnectedUser,
  ) {
    return this.cvService.update(id, updateCvDto, user);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @User() user: ConnectedUser) {
    return this.cvService.remove(id, user);
  }
}
