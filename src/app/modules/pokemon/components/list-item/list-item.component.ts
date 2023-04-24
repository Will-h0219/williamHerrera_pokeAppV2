import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() pokemon!: Pokemon;
  @Output() onDelete: EventEmitter<number> = new EventEmitter();

  constructor(
    private pokemonService: PokemonService
  ) {}

  delete() {
    this.pokemonService.deletePokemon(this.pokemon.id!).subscribe({
      next: (resp) => {
        this.onDelete.emit(this.pokemon.id);
      }
    });
  }

  edit() {
    this.pokemonService.setPokemon(this.pokemon);
  }
}
