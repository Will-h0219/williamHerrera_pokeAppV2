import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() onSearch: EventEmitter<Pokemon | null> = new EventEmitter();
  searchForm!: FormGroup;
  noResults: boolean = false;

  get controls() {
    return this.searchForm.controls;
  }

  constructor(
    private pokemonService: PokemonService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  search() {
    if (!this.searchForm.value.searchField) {
      return;
    }
    this.pokemonService.getPokemon(this.searchForm.value.searchField)
      .pipe(
        tap(() => this.noResults = false)
      )
      .subscribe({
        next: (resp) => {
          this.onSearch.emit(resp);
        },
        error: (err) => {
          if (err.status === 404) {
            this.noResults = true;
            this.onSearch.emit(null);
          }
        }
      });
  }

  private createForm() {
    this.searchForm = this.fb.group({
      searchField: this.fb.nonNullable.control('', [Validators.pattern(/^[a-zA-Z0-9]*$/)])
    });
  }
}
