
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { CvService } from './cv.service.js';
import { CreateCvDto } from './dto/create-cv.dto.js';
import { UpdateCvDto } from './dto/update-cv.dto.js';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  // Ajouter un CV
  @Post()
  create(@Body() createCvDto: CreateCvDto) {
    return this.cvService.create(createCvDto);
  }

  // Récupérer tous les CV
  @Get()
  findAll() {
    return this.cvService.findAll();
  }

  // Récupérer un CV par ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cvService.findOne(id);
  }

  // Modifier un CV
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCvDto: UpdateCvDto,
  ) {
    return this.cvService.update(id, updateCvDto);
  }

  // Supprimer un CV
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cvService.remove(id);
  }
}
