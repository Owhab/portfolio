import { Language } from 'src/common/enums/language.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('settings')
export class Settings {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  siteName: string;
  @Column()
  siteShortName: string;
  @Column()
  siteDescription: string;
  @Column()
  siteUrl: string;
  @Column()
  siteLogo: string;
  @Column()
  favicon: string;
  @Column()
  themeColor: string;
  @Column()
  defaultLanguage: Language;
}
