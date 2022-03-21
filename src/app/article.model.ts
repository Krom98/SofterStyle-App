import { Info } from './info.model';
export interface Article {
  id?: number;
  nom?: string;
  prix?: number;
  taille?: number;
  link?: string;
  info?: Info;
}
