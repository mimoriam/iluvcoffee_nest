import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  Regular = 'regular',
  Admin = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ enum: Role, default: Role.Regular })
  role: Role;
}
