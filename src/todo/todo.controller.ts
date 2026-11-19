import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';
import type { ConnectedUser } from '../auth/interfaces/jwt-payload.interface';

@Controller('todo')
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @User() user: ConnectedUser) {
    return this.todoService.create(createTodoDto, user.id);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @User() user: ConnectedUser,
  ) {
    return this.todoService.update(id, updateTodoDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: ConnectedUser) {
    return this.todoService.remove(id, user.id);
  }
}
