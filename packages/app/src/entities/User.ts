import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  IsDate,
} from 'class-validator';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp')
  @IsDate()
  createdDate: Date;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({
    unique: true,
    nullable: true,
  })
  telegramId: string;

  @Column({ default: 150 })
  tokens: number;
}
