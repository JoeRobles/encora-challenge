import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PokeListInterface } from '../models/poke-list.interface';
import { PokemonInterface } from '../models/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private _apiURL = 'https://pokeapi.co/api/v2';

  constructor(private _httpClient: HttpClient) { }

  getPokemonPaginatedList(offset: number, limit: number): Observable<PokeListInterface> {
    return this._httpClient.get<PokeListInterface>(`${this._apiURL}/pokemon?offset=${offset}&limit=${limit}`);
  }

  getPokemonDetails(pokemonId: string): Observable<PokemonInterface> {
    return this._httpClient.get<PokemonInterface>(`${this._apiURL}/pokemon/${pokemonId}`);
  }
}
