import { Injectable } from '@angular/core';

import { PokeApiService } from './poke-api.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PokeListInterface } from '../models/poke-list.interface';
import { PokemonInterface } from '../models/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokeService {

  private _pokemonList$ = new Subject<PokeListInterface>();

  set pokemonList(value: PokeListInterface) {
    this._pokemonList$.next(value);
  }

  get pokemonList(): Observable<PokeListInterface> {
    return this._pokemonList$;
  }

  private _pokemonDetail$ = new BehaviorSubject<PokemonInterface>({} as PokemonInterface);

  set pokemonDetail(value: PokemonInterface) {
    this._pokemonDetail$.next(value);
  }

  get pokemonDetail(): BehaviorSubject<PokemonInterface> {
    return this._pokemonDetail$;
  }

  constructor(private _pokeApiService: PokeApiService) { }

  getPokemonList(offset: number, limit: number): void {
    this._pokeApiService.getPokemonPaginatedList(offset, limit).subscribe({
      next: (response) => {
        this.pokemonList = {} as PokeListInterface;
        this.pokemonList = response
      },
      error: (error) => {

      }
    });
  }

  getPokemonDetails(pokemonId: string): void {
    this._pokeApiService.getPokemonDetails(pokemonId).subscribe({
      next: (response) => this.pokemonDetail = response,
      error: (error) => {

      }
    });
  }
}
