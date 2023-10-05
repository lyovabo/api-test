import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  isVerified: boolean;

  @CreateDateColumn({ select: false })
  public createdAt: Date;

  @DeleteDateColumn({ select: false })
  public deletedAt?: Date;

  @UpdateDateColumn()
  public updatedAt?: Date;
}
