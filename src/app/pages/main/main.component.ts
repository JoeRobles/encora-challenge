import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle } from '@angular/material/card';
import { MatPaginator } from '@angular/material/paginator';
import { last, Subscription, zip } from 'rxjs';

import { PokeService } from '../../shared/services/poke.service';
import { PokeApiService } from '../../shared/services/poke-api.service';
import { PokemonInterface } from '../../shared/models/pokemon.interface';
import { PokeListInterface } from "../../shared/models/poke-list.interface";
import { MatDialog } from "@angular/material/dialog";
import { PokemonDetailsComponent } from "../../components/pokemon-details/pokemon-details.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    HttpClientModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatGridList,
    MatGridTile,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatCardImage,
    MatPaginator,
    NgIf
  ],
  providers: [
    PokeService,
    PokeApiService
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit, OnDestroy {
  pokemonTypes: string[] = [];
  pokemonFiltered: string[] = [];
  pokemonList$ = this.pokeService.pokemonList;
  pageSizes = [10, 20, 50, 100];
  offset = 0;
  pageSize = 10;
  subscriptions: Subscription[] = [];
  pokemonList: PokemonInterface[] = [];
  allPokemon: string[] = [];
  last = last;

  constructor(
    private pokeService: PokeService,
    private pokeApiService: PokeApiService,
    private dialog: MatDialog
  ) {
    this.pokeService.getPokemonList(this.offset, this.pageSize);
  }

  ngOnInit() {
    this.pokemonList$.subscribe({
      next: (response) => {
        this.allPokemon = [];
        this.pokemonTypes = [];
        this.pokemonFiltered = [];
        this.pokemonList = [];
        response?.results?.map((pokemon) => {
          const pokemonId = pokemon.url?.split('/').filter((item) => item !== '').pop();
          if (pokemonId) {
            this.allPokemon.push(pokemonId);
          }
        });
        const obs = zip([...this.allPokemon.map((pokemonId) => this.pokeApiService.getPokemonDetails(pokemonId))]);
        obs.subscribe({
          next: (res) => {
            res.map((pokemon) => {
              pokemon.types.map((type) => {
                if (this.pokemonTypes.indexOf(type.type.name) === -1) {
                  this.pokemonTypes.push(type.type.name);
                  this.pokemonFiltered.push(type.type.name);
                }
              });
            });
            this.pokemonList = res;
          }
        });
      }
    });
  }

  filterPokemonByType(type: MatButtonToggleChange) {
    if (this.pokemonFiltered.indexOf(type.source.value) !== -1) {
      this.pokemonFiltered = this.pokemonFiltered.filter((pokemonType) => pokemonType !== type.source.value);
    } else {
      this.pokemonFiltered.push(type.source.value);
    }
  }

  hasType(pokemon: PokemonInterface): boolean {
    return pokemon.types.some((type) => this.pokemonFiltered.indexOf(type.type.name) !== -1);
  }

  isFilteredType(type: string): boolean {
    return this.pokemonFiltered.indexOf(type) !== -1;
  }

  onPageChange(event: any) {
    this.offset = event.pageIndex * event.pageSize;
    this.pageSize = event.pageSize;
    this.pokemonList = [];
    this.pokeService.getPokemonList(this.offset, this.pageSize);
  }

  pokemonDetails(pokemon: PokemonInterface) {
    this.pokeService.pokemonDetail = pokemon;
    this.dialog.open(PokemonDetailsComponent, {
      width: '1100px',
      height: '600px',
      data: pokemon
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

}
