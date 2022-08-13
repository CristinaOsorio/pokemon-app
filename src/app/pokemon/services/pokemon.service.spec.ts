import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Pokemon, CreatePokemonDTO, UpdatePokemonDTO } from '../interfaces/pokemon.interface';

import { PokemonService } from './pokemon.service';
import { Response } from '../interfaces/response.interface';

describe('PokemonService Test', () => {
  let service: PokemonService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PokemonService
      ]
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    service = new PokemonService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return pokemon correctly', () => {

    const mockResult: Pokemon[] = [
      {
        id: 1,
        name: 'Pikachu',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png',
        attack: 50,
        defense: 30,
        hp: 20,
        type: 'Eléctrico',
        id_author: 1,
      },
      {
        id: 2,
        name: 'Charizard',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png',
        attack: 84,
        defense: 78,
        hp: 20,
        type: 'Fuego/Volador',
        id_author: 1,
      }
    ]

    httpClientSpy.get.and.returnValues(of(mockResult));

    service.getPokemon().subscribe(
      result => {
        expect(result).toEqual(mockResult);
      }
    )
  })

  it('should save new pokemon', (done) => {

    const mockNewPokemon: CreatePokemonDTO =
    {
      name: 'Weedle',
      image: 'https://www.pngkey.com/png/full/230-2306182_weedle-pokemon-weedle.png',
      attack: 35,
      defense: 30,
      hp: 12,
      type: "Bicho/Veneno",
      idAuthor: 1
    };

    const mockResult: Pokemon = {
      id: 2022,
      name: "Weedle",
      image: "https://www.pngkey.com/png/full/230-2306182_weedle-pokemon-weedle.png",
      attack: 35,
      defense: 30,
      hp: 12,
      type: "Bicho/Veneno",
      id_author: 1
    }

    httpClientSpy.post.and.returnValues(of(mockResult));

    service.createPokemon(mockNewPokemon).then(
      (result) => {
        expect(result).toEqual(mockResult);
      }

    )
    done();
  })

  it('should update pokemon', () => {

    const mockEditPokemonId: number = 1;

    const mockEditPokemon: UpdatePokemonDTO =
    {
      name: 'Weedle',
      image: 'https://www.pngkey.com/png/full/230-2306182_weedle-pokemon-weedle.png',
      attack: 35,
      defense: 30,
      hp: 12,
      type: "Bicho/Veneno",
    };

    const mockResult: Pokemon = {
      id: 1,
      name: "Golbat",
      image: "https://www.pngplay.com/wp-content/uploads/11/Golbat-Pokemon-Background-PNG.png",
      attack: 80,
      defense: 70,
      hp: 75,
      type: "Veneno/Volado",
      id_author: 1
    }

    httpClientSpy.put.and.returnValues(of(mockResult));

    service.updatePokemon(mockEditPokemonId, mockEditPokemon).subscribe(
      result => {
        expect(result).toEqual(mockResult);
      }
    )
  })

  it('should delete pokemon', () => {

    const mockDeletePokemonId: number = 1;

    const mockResult: Response = {
      success: true,
      type: "pokemon_removed",
      data: []
    }

    httpClientSpy.delete.and.returnValues(of(mockResult));

    service.deletePokemon(mockDeletePokemonId).subscribe(
      result => {
        expect(result).toEqual(mockResult);
      }
    )
  })

  it('should get pokemon by Id', () => {

    const mockDeletePokemonId: number = 1;


    const mockResult: Pokemon = {
      id: 1,
      name: "Golbat",
      image: "https://www.pngplay.com/wp-content/uploads/11/Golbat-Pokemon-Background-PNG.png",
      attack: 80,
      defense: 70,
      hp: 75,
      type: "Veneno/Volado",
      id_author: 1
    }

    httpClientSpy.get.and.returnValues(of(mockResult));

    service.getPokemonById(mockDeletePokemonId).subscribe(
      result => {
        expect(result).toEqual(mockResult);
      }
    )
  })
});
