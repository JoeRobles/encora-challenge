import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PokeApiService } from './poke-api.service';
import { PokeServiceStub } from './poke.service.stub';
import { PokemonInterface } from '../models/pokemon.interface';
import { PokeListInterface } from '../models/poke-list.interface';

describe('PokeApiService', () => {
  let service: PokeApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokeApiService]
    });
    service = TestBed.inject(PokeApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch pokemon paginated list', () => {
    const mockPokemonList: PokeListInterface = PokeServiceStub.getPokemonList();
    const offset = 0;
    const limit = 10;

    service.getPokemonPaginatedList(offset, limit).subscribe((list) => {
      expect(list).toEqual(mockPokemonList);
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemonList);
  });

  it('should fetch pokemon details', () => {
    const mockPokemonDetail: PokemonInterface = PokeServiceStub.getPokemonDetails();
    const pokemonId = '1';

    service.getPokemonDetails(pokemonId).subscribe((detail) => {
      expect(detail).toEqual(mockPokemonDetail);
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemonDetail);
  });
});
