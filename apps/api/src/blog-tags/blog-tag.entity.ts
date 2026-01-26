import { Blog } from 'src/blogs/blog.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('blog_tags')
export class BlogTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ length: 100 })
  name: string; // e.g. nestjs, backend

  @Column({ type: 'int', default: 0 })
  usageCount: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Blog, (blog) => blog.tags)
  blogs: Blog[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
