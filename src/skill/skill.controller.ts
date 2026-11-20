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
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Auth(Role.ADMIN)
  @Post()
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillService.create(createSkillDto);
  }

  @Get()
  findAll() {
    return this.skillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.skillService.findOne(id);
  }

  @Auth(Role.ADMIN)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillService.update(id, updateSkillDto);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.skillService.remove(id);
  }
}
