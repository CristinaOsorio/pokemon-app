import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonComponent } from './pokemon.component';
import { PokemonService } from '../services/pokemon.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of, throwError } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon.interface';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const pokemonInformation = [
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
];

const mockedPokemonService: {
  getPokemon: () => Observable<Pokemon[]>
} = {
  getPokemon: () => of(pokemonInformation)
};

describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ PokemonComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [ 
        { provide: PokemonService, useValue: mockedPokemonService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the PokemonComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPokemon, getPokemon()', () => {
    const getMePokemonSpy = spyOn(mockedPokemonService, 'getPokemon');

    // success path
    getMePokemonSpy.and.returnValue(of(pokemonInformation));
    component.getPokemon();
    expect(mockedPokemonService.getPokemon).toHaveBeenCalled();
    expect(component.pokemon).toEqual(pokemonInformation);

    // cath error path
    getMePokemonSpy.and.returnValue(throwError(() => []));
    component.pokemon = [];
    component.getPokemon();
    expect(mockedPokemonService.getPokemon).toHaveBeenCalled();
    expect(component.pokemon).toEqual([]);
  });


});
