import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { AddPokemonComponent } from '../../components/add-pokemon/add-pokemon.component';
import { BehaviorSubject } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild(AddPokemonComponent) addPokemon!: AddPokemonComponent;
  pokemon: Pokemon | null = null;
  error$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.error$ = this.pokemonService.showMessage$;
  }

  ngOnDestroy(): void {
    this.error$.unsubscribe();
  }

  setPokemon(data: Pokemon | null): void {
    this.pokemon = data;
  }

  setNew() {
    this.addPokemon.cancel();
    this.pokemon = null;
  }
}
