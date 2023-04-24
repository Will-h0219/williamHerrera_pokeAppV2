import { Component, Input } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() pokemonList: Pokemon[] = [];
  @Input() pokemon: Pokemon | null = null;

  removeItem(id: number) {
    if (this.pokemon && this.pokemon.id === id) {
      this.pokemon = null;
    }
  }
}
