import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Pokemon, CreatePokemonDTO, UpdatePokemonDTO } from '../interfaces/pokemon.interface';
import { Response } from '../interfaces/response.interface';
import { instanceOf } from '../../helpers/instance-of.helper';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  private urlBase = environment.api

  constructor(private http: HttpClient) { }

  getPokemon(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.urlBase}/?idAuthor=1`);
  }

  createPokemon(pokemon: CreatePokemonDTO): Promise<Pokemon> {
    return new Promise((resolve, reject) => {
      this.http.post<Pokemon | Response>(`${this.urlBase}/?idAuthor=1`, pokemon)
        .subscribe(
          data => {
            console.log('Pokemon' in data)
            instanceOf<Pokemon>(data) ? resolve(data) : reject(data);
          },
          error => {
            reject({
              success: false,
              type: "server",
              data: "server error."
            });
          }
        )
    })
  }

  updatePokemon(id: number, pokemon: UpdatePokemonDTO): Observable<Pokemon> {
    return this.http.put<Pokemon>(`${this.urlBase}/${id}`, pokemon);
  }

  deletePokemon(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.urlBase}/${id}`);
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.urlBase}/${id}`);
  }

}
