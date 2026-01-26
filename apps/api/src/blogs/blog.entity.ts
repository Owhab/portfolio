import { BlogTag } from 'src/blog-tags/blog-tag.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('blogs')
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 5000,
  })
  content: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 1000,
  })
  excerpt: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 1000,
  })
  coverImage: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isPublished: boolean;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  publishedAt: Date;

  @Column({
    type: 'boolean',
    default: false,
  })
  isFeatured: boolean;

  @Column({
    type: 'int',
    nullable: false,
  })
  readTime: number;

  @ManyToMany(() => BlogTag, (tag) => tag.blogs, {
    cascade: true,
  })
  @JoinTable({
    name: 'blog_tag_relations',
    joinColumn: { name: 'blog_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: BlogTag[];

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  seoTitle: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 500,
  })
  seoDescription: string;

  @Column({
    type: 'int',
    default: 0,
  })
  viewCount: number;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  updatedAt: Date;
}
