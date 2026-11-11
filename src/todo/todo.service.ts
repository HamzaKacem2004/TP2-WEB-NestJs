import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  
  async create(dto: CreateTodoDto, userId: number) {
    const newTodo = this.todoRepository.create({ ...dto, userId });
    return await this.todoRepository.save(newTodo);
  }

  async findAll() {
    return await this.todoRepository.find();
  }

  async findOne(id: string) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) throw new NotFoundException("Todo introuvable");
    return todo;
  }

  
  async update(id: string, dto: UpdateTodoDto, userId: number) {
    const todo = await this.findOne(id);
    
    if (todo.userId !== userId) {
      throw new ForbiddenException("Vous n'avez pas le droit de modifier ce Todo.");
    }

    Object.assign(todo, dto);
    return await this.todoRepository.save(todo);
  }

  
  async remove(id: string, userId: number) {
    const todo = await this.findOne(id);
    
    if (todo.userId !== userId) {
      throw new ForbiddenException("Vous n'avez pas le droit de supprimer ce Todo.");
    }

    return await this.todoRepository.remove(todo);
  }
}