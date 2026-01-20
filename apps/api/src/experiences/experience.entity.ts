import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('experiences')
export class Experience {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({
    length: 150,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  company: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  location: string;

  @Column({
    type: 'date',
  })
  startDate: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  endDate?: Date | null;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 2000,
  })
  description?: string | null;

  @Column({ default: false })
  isCurrent: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  techStack?: string;

  @Column({ type: 'int', default: 0 })
  sortOrder?: number;

  @Column({ default: true })
  isActive?: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
