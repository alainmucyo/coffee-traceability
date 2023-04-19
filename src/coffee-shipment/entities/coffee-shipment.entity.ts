import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { User } from '../../user/entities/user.entity';

@Entity('coffee_shipments')
export class CoffeeShipment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shipmentId: string;

  @Column()
  @ApiProperty()
  @IsNotEmpty()
  origin: string;

  @Column()
  @ApiProperty()
  @IsNotEmpty()
  destination: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty()
  @IsNotEmpty()
  quantity: number;

  @Column()
  currentHolderId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'currentHolderId' })
  currentHolder: User;
  @Column({ default: 'production' })
  @ApiProperty()
  @IsIn(['production', 'distribution', 'retail'])
  @IsOptional()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
