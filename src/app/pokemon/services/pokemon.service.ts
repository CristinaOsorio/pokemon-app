import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Pokemon, CreatePokemonDTO, UpdatePokemonDTO } from '../interfaces/pokemon.interface';
import { ResponseDelete } from '../interfaces/response-delete.interface';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  private  urlBase  = environment.api

  constructor(private http: HttpClient) { }

  getPokemon(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.urlBase}/?idAuthor=1`);
  }

  createPokemon(pokemon: CreatePokemonDTO): Observable<Pokemon> {
    return this.http.post<Pokemon>(`${this.urlBase}/?idAuthor=1`, pokemon);
  }

  updatePokemon(id: number, pokemon: UpdatePokemonDTO): Observable<Pokemon> {
    return this.http.put<Pokemon>(`${this.urlBase}/${id}`, pokemon);
  }

  deletePokemon(id: number): Observable<ResponseDelete> {
    return this.http.delete<ResponseDelete>(`${this.urlBase}/${id}`);
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.urlBase}/${id}`);
  }

}
