
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvModule } from './cv/cv.module.js';
import { UserModule } from './user/user.module.js';
import { SkillModule } from './skill/skill.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqljs',
      autoSave: true,
      location: 'database.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CvModule,
    SkillModule,
    UserModule,
  ],
})
export class AppModule {}


/*
SLIDE 3

import {
  Module,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';

import { TodosModule } from './todos/todos.module.js';
import { TodosController } from './todos/todos.controller.js';
import { AuthMiddleware } from './common/middleware/auth.middleware.js';
import { CvModule } from './cv/cv.module.js';

@Module({
  imports: [TodosModule],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(TodosController);
  }
}

*/
