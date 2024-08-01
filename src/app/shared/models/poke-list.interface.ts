import { NameUrlInterface } from './name-url.interface';

export interface PokeListInterface {
  count: number;
  next: string;
  previous: string;
  results: NameUrlInterface[];
}
