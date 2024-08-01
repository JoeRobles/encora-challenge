import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { PokeService } from './poke.service';
import { PokeApiService } from './poke-api.service';
import { PokemonInterface } from '../models/pokemon.interface';
import { PokeServiceStub } from "./poke.service.stub";

describe('PokeService', () => {
  let service: PokeService;
  let pokeApiServiceSpy: jasmine.SpyObj<PokeApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('PokeApiService', ['getPokemonPaginatedList', 'getPokemonDetails']);
    TestBed.configureTestingModule({
      providers: [
        PokeService,
        { provide: PokeApiService, useValue: spy }
      ]
    });
    service = TestBed.inject(PokeService);
    pokeApiServiceSpy = TestBed.inject(PokeApiService) as jasmine.SpyObj<PokeApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch and set pokemon details', (done: DoneFn) => {
    const mockPokemonDetail: PokemonInterface = PokeServiceStub.getPokemonDetails();
    pokeApiServiceSpy.getPokemonDetails.and.returnValue(of(mockPokemonDetail));

    service.getPokemonDetails('1');

    service.pokemonDetail.subscribe((detail) => {
      expect(detail).toEqual(mockPokemonDetail);
      done();
    });
  });
});
