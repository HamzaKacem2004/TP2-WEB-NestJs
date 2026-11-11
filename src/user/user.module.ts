import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- AJOUT
import { User } from './entities/user.entity'; // <-- AJOUT

@Module({
  imports: [TypeOrmModule.forFeature([User])], // <-- LA LIGNE CRUCIALE
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}