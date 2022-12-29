import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../entities/user.entity';

@Entity()
export class ApiKey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  uuid: string;

  @ManyToOne(() => User, (user) => user.apiKeys)
  user: User;

  // One could create a new Entity called "Scope", establish a M-M relationship
  // With the scopes feature, users could selectively grant specific permissions
  // to given API Keys. For example: The API keys could let a 3rd-party "read"
  // data but not "modify" it
  // scopes: Scope[]
}
