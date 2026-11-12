import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Skill } from './skill/entities/skill.entity';
import { Cv } from './cv/entities/cv.entity';
import { randEmail, randFirstName, randLastName, randUserName, randNumber } from '@ngneat/falso';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userRepository = app.get<Repository<User>>(getRepositoryToken(User));
  const skillRepository = app.get<Repository<Skill>>(getRepositoryToken(Skill));
  const cvRepository = app.get<Repository<Cv>>(getRepositoryToken(Cv));

  // 1. Nettoyage des tables
  await cvRepository.query('SET FOREIGN_KEY_CHECKS = 0;');
  await cvRepository.clear();
  await userRepository.clear();
  await skillRepository.clear();
  await cvRepository.query('SET FOREIGN_KEY_CHECKS = 1;');

  // 2. On crée quelques compétences de base
  const skill1 = await skillRepository.save({ designation: 'JavaScript' });
  const skill2 = await skillRepository.save({ designation: 'NestJS' });
  const skill3 = await skillRepository.save({ designation: 'MySQL' });
  const skillsDisponibles = [skill1, skill2, skill3];

  console.log('⏳ Création de 10 utilisateurs et de leurs CVs en cours...');

  // 3. BOUCLE POUR CRÉER 10 UTILISATEURS ET CVs
  for (let i = 0; i < 10; i++) {
    // Création de l'utilisateur
    const user = await userRepository.save({
      username: randUserName(),
      email: randEmail(),
      password: 'password123',
    });

    // Création du CV pour cet utilisateur
    await cvRepository.save({
      name: randLastName(),
      firstname: randFirstName(),
      age: randNumber({ min: 20, max: 50 }),
      cin: `CIN-${i}`, // On utilise "i" pour être sûr que le CIN soit unique
      job: 'Développeur FullStack',
      path: 'uploads/cv.pdf',
      user: user, 
      skills: skillsDisponibles, // On assigne les 3 compétences à chaque CV
    });
  }

  console.log(' Seed terminé avec succès ! 10 Utilisateurs et 10 CVs ont été créés.');

  await app.close();
}

bootstrap();