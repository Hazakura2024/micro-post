import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MicroPost } from './micropost';
import { Auth } from './auth';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  hash: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  icon_path?: string;

  @OneToMany(() => MicroPost, (micropost) => micropost.user)
  microPosts: MicroPost[];

  @OneToMany(() => Auth, (auth) => auth.user)
  auths: Auth[];

  @CreateDateColumn()
  readonly created_at?: Date;

  @UpdateDateColumn()
  readonly updated_at?: Date;
}
