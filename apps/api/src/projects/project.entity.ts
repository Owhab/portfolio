import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({
    length: 150,
    default: 'title',
  })
  title: string;

  @Column({
    type: 'varchar',
    default: 'description',
  })
  description: string;

  @Column({ type: 'longtext', nullable: true })
  longDescription?: string;

  @Column({ length: 255, nullable: true, default: '' })
  thumbnail?: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  techStack: string;

  @Column({ length: 255, nullable: true, default: '' })
  liveUrl?: string;

  @Column({ length: 255, nullable: true, default: '' })
  githubUrl?: string;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @Column({ type: 'boolean', default: false })
  isFeatured: boolean;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
