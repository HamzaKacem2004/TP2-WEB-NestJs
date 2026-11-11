import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('todo')
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  
  @Column()
  userId: number; 
}