
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cv } from './entities/cv.entity.js';
import { CvService } from './cv.service.js';
import { CvController } from './cv.controller.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cv]),
  ],
  controllers: [CvController],
  providers: [CvService],
})
export class CvModule {}
