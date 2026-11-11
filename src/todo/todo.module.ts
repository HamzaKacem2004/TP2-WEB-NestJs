import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoEntity } from './entities/todo.entity';
import { AuthMiddleware } from '../auth.middleware'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoEntity]) 
  ],
  controllers: [TodoController],
  providers: [TodoService],
})

export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(TodoController);
  }
}