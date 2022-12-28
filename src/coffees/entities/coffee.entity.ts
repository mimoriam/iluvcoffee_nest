import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { JoinTable } from 'typeorm/browser';
import { Flavor } from './flavor.entity';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, {
    cascade: true,
  })
  flavors: Flavor[];
}
