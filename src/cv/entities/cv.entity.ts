
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';

import { Skill } from '../../skill/entities/skill.entity.js';
import { User } from '../../user/entities/user.entity.js';

@Entity('cv')
export class Cv {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  firstname!: string;

  @Column({ type: 'integer' })
  age!: number;

  @Column()
  cin!: string;

  @Column()
  job!: string;

  @Column()
  path!: string;

  @ManyToMany(() => Skill, (skill) => skill.cvs)
  @JoinTable()
  skills!: Skill[];

  @ManyToOne(() => User, (user) => user.cvs)
  user!: User;
}
