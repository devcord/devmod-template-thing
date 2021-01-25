import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime')
  executeAfter: Date;

  @Column()
  task: string;

  @Column('json')
  args: string;
}
