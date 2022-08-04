
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PokemonListComponent } from './pokemon-list.component';
import { DebugElement } from '@angular/core';

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

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;

    component.pokemon = pokemonInformation;
    de = fixture.debugElement

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show pokemon in table row', () => {
    fixture.detectChanges();
    const rowDebugElements = de.queryAll(By.css('tbody tr'));
    expect(rowDebugElements.length).toBe(2);
  });

});
