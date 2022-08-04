import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon.interface';

import { PokemonService } from './pokemon.service';

describe('PokemonService Test', () => {
  let service: PokemonService;
  let httpClientSpy: { get: jasmine.Spy  };


  beforeEach(() => { 
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PokemonService
      ]
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new PokemonService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test the pokemon are returned correctly', () => {

    const mockResult: Pokemon[] = [
      {
          id:        1,
          name:      'Pikachu',
          image:     'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png',
          attack:    50,
          defense:   30,
      },
      {
          id:        2,
          name:      'Charizard',
          image:     'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png',
          attack:    84,
          defense:   78,
      }
    ]

    httpClientSpy.get.and.returnValues(of(mockResult));

    service.getPokemon().subscribe(
      result => {
        expect(result).toEqual(mockResult);
      }
    )
  })
});
