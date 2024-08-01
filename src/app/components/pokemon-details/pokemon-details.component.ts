import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle } from "@angular/material/card";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';

import { PokemonInterface } from '../../shared/models/pokemon.interface';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [
    HttpClientModule,
    MatGridList,
    NgIf,
    AsyncPipe,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatGridTile,
    NgForOf,
    MatCardImage
  ],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss'
})
export class PokemonDetailsComponent {
  pokemonDetail: PokemonInterface = {} as PokemonInterface;

  constructor(@Inject(MAT_DIALOG_DATA) public data: PokemonInterface) {
    this.pokemonDetail = data;
  }
}
