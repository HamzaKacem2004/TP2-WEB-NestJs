import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- AJOUT
import { Cv } from './entities/cv.entity'; // <-- AJOUT

@Module({
  imports: [TypeOrmModule.forFeature([Cv])], // <-- LA LIGNE CRUCIALE
  controllers: [CvController],
  providers: [CvService],
})
export class CvModule {}