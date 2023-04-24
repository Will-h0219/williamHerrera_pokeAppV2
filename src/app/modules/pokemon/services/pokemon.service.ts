import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Pokemon } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl: string = environment.baseUrl;
  private showMessage: boolean = false;

  pokemon: Pokemon | null = null;
  pokemon$ = new BehaviorSubject<Pokemon | null>(null);
  showMessage$ = new BehaviorSubject<boolean>(this.showMessage);

  constructor(private http: HttpClient) { }

  getPokemonList(idAuthor: string): Observable<Pokemon[]> {
    const url = `${this.baseUrl}/?idAuthor=${idAuthor}`;
    return this.http.get<Pokemon[]>(url);
  }

  getPokemon(id: string | number): Observable<Pokemon> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Pokemon>(url);
  }

  createPokemon(data: Pokemon): Observable<Pokemon> {
    return this.http.post<Pokemon>(this.baseUrl, data);
  }

  updatePokemon(id: number, data: Pokemon): Observable<Pokemon> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Pokemon>(url, data);
  }

  deletePokemon(id: number): Observable<null> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<null>(url);
  }

  setPokemon(data?: Pokemon): void {
    this.pokemon = data ?? null;
    this.pokemon$.next(this.pokemon);
  }

  setShowMessage(showMessage: boolean): void {
    this.showMessage = showMessage;
    this.showMessage$.next(this.showMessage);
  }
}
