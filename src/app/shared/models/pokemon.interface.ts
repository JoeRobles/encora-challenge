import { PokemonAbilityInterface } from './pokemon-ability.interface';
import { NameUrlInterface } from './name-url.interface';
import { CryInterface } from './cry.interface';
import { GameIndexInterface } from './game-index.interface';
import { MoveInterface } from './move.interface';
import { StatInterface } from './stat.interface';
import { TypeInterface } from './type.interface';

export interface PokemonInterface {
  abilities: PokemonAbilityInterface[];
  base_experience: number;
  cries: CryInterface;
  forms: NameUrlInterface[];
  game_indices: GameIndexInterface[];
  height: number;
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: MoveInterface[];
  name: string;
  order: number;
  past_abilities: [];
  past_types: [];
  species: NameUrlInterface;
  sprites: {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
    other: {
      dream_world: {
        front_default: string;
        front_female: string | null;
      };
      home: {
        front_default: string;
        front_female: string | null;
        front_shiny: string;
        front_shiny_female: string | null;
      };
      'official-artwork': {
        front_default: string;
        front_shiny: string;
      };
      showdown: {
        back_default: string;
        back_female: string | null;
        back_shiny: string;
        back_shiny_female: string | null;
        front_default: string;
        front_female: string | null;
        front_shiny: string;
        front_shiny_female: string | null;
      };
    };
  };
  stats: StatInterface[];
  types: TypeInterface[];
  weight: number;
}
