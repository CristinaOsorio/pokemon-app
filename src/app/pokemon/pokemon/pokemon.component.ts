import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  pokemon: Pokemon[] = []; 

  constructor(
    private pokemonService: PokemonService
    ) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon() {
    this.pokemonService.getPokemon().subscribe(pokemon => {
      (this.pokemon = pokemon)
    },
    error => {
      this.pokemon = [];
    });
  }


}
