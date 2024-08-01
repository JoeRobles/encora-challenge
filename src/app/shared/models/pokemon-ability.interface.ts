import { NameUrlInterface } from './name-url.interface';

export interface PokemonAbilityInterface     {
  ability: NameUrlInterface;
  is_hidden: boolean;
  slot: number;
}
