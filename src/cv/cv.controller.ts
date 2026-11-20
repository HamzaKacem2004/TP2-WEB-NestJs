import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';
import type { ConnectedUser } from '../auth/interfaces/jwt-payload.interface';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCvDto: CreateCvDto, @User() user: ConnectedUser) {
    return this.cvService.create(createCvDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@User() user: ConnectedUser) {
    return this.cvService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cvService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCvDto: UpdateCvDto,
    @User() user: ConnectedUser,
  ) {
    return this.cvService.update(id, updateCvDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @User() user: ConnectedUser) {
    return this.cvService.remove(id, user);
  }
}
