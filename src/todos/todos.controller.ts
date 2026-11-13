import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  ParseIntPipe,
} from '@nestjs/common';

import { TodosService } from './todos.service.js';
import type { AuthenticatedRequest } from '../common/interfaces/authenticated-request.interface.js';

@Controller('todos')
export class TodosController {

  constructor(
    private readonly todosService: TodosService,
  ) {}

  @Post()
  create(
    @Body() body: { title: string },
    @Req() req: AuthenticatedRequest,
  ) {
    return this.todosService.create(
      body.title,
      req.userId!,
    );
  }

  @Get()
  findAll(
    @Req() req: AuthenticatedRequest,
  ) {
    return this.todosService.findAll(
      req.userId!,
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { title: string },
    @Req() req: AuthenticatedRequest,
  ) {
    return this.todosService.update(
      id,
      body.title,
      req.userId!,
    );
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    this.todosService.remove(
      id,
      req.userId!,
    );

    return {
      message: 'Todo supprimé avec succès',
    };
  }
}