import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Skill } from './skill/entities/skill.entity';
import { Cv } from './cv/entities/cv.entity';
import { randEmail, randFirstName, randLastName, randUserName, randNumber } from '@ngneat/falso';
import { hash } from 'bcryptjs';
import { Role } from './auth/enums/role.enum';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userRepository = app.get<Repository<User>>(getRepositoryToken(User));
  const skillRepository = app.get<Repository<Skill>>(getRepositoryToken(Skill));
  const cvRepository = app.get<Repository<Cv>>(getRepositoryToken(Cv));

  await cvRepository.query('SET FOREIGN_KEY_CHECKS = 0;');
  await cvRepository.query('TRUNCATE TABLE cv_skills_skill;');
  await cvRepository.clear();
  await userRepository.clear();
  await skillRepository.clear();
  await cvRepository.query('SET FOREIGN_KEY_CHECKS = 1;');

  const skill1 = await skillRepository.save({ designation: 'JavaScript' });
  const skill2 = await skillRepository.save({ designation: 'NestJS' });
  const skill3 = await skillRepository.save({ designation: 'MySQL' });
  const skillsDisponibles = [skill1, skill2, skill3];

  await userRepository.save({
    username: 'admin',
    email: 'admin@gestion-cv.com',
    password: await hash('admin123', 10),
    role: Role.ADMIN,
  });

  console.log('⏳ Création de 10 utilisateurs et de leurs CVs en cours...');

  for (let i = 0; i < 10; i++) {
    const user = await userRepository.save({
      username: randUserName(),
      email: randEmail(),
      password: await hash('password123', 10),
    });

    await cvRepository.save({
      name: randLastName(),
      firstname: randFirstName(),
      age: randNumber({ min: 20, max: 50 }),
      cin: `CIN-${i}`,
      job: 'Développeur FullStack',
      path: 'uploads/cv.pdf',
      user: user, 
      skills: skillsDisponibles,
    });
  }

  console.log(' Seed terminé avec succès ! 10 Utilisateurs et 10 CVs ont été créés.');
  console.log(' Admin : admin / admin123 — Utilisateurs : <username> / password123');

  await app.close();
}

bootstrap();