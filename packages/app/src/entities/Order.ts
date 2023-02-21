import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import {
  IsDate,
} from 'class-validator';

import {
  UserEntity,
} from './User';

export enum Status {
  PARTIAL = 'PARTIAL',
  PAID = 'PAID',
  REJECTED = 'REJECTED',
  WAITING = 'WAITING',
}

export enum Currency {
  RUB = 'RUB',
  USD = 'USD',
}

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  user: UserEntity;

  @Column('timestamp', {
    nullable: true,
  })
  @IsDate()
  createdDate: Date;

  @Column('timestamp', {
    nullable: true,
  })
  @IsDate()
  paymentDate: Date;

  @Column()
  orderId: string;

  @Column()
  refundId: string;

  @Column({
    default: Status.WAITING,
  })
  status: Status;

  @Column()
  amount: string;

  @Column()
  currency: Currency;
}
