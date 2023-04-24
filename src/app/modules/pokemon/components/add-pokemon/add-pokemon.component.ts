import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { constants } from './app-pokemon.contants';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-pokemon',
  templateUrl: './add-pokemon.component.html',
  styleUrls: ['./add-pokemon.component.scss']
})
export class AddPokemonComponent implements OnInit, OnDestroy {
  @Output() onSave: EventEmitter<Pokemon> = new EventEmitter();
  constants = { ...constants };
  addPokemonForm!: FormGroup;
  pokemon: Pokemon | null = null;

  constructor(
    private fb: FormBuilder,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.pokemonSubscription();
  }

  ngOnDestroy(): void {
    this.pokemonService.pokemon$.unsubscribe();
  }

  cancel() {
    this.addPokemonForm.reset();
    this.pokemonService.setPokemon();
  }

  save() {
    if (!this.pokemon) {
      this.pokemonService.createPokemon(this.addPokemonForm.value).subscribe({
        next: (resp) => this.handleSave(resp)
      });
    } else {
      this.pokemonService.updatePokemon(this.pokemon.id!, this.addPokemonForm.value).subscribe({
        next: (resp) => {
          this.handleSave(resp);
        }
      })
    }
  }

  private createForm(): void {
    this.addPokemonForm = this.fb.group({
      name: this.fb.nonNullable.control('', [Validators.required]),
      image: this.fb.nonNullable.control('', [Validators.required]),
      attack: this.fb.nonNullable.control(0, [Validators.required, Validators.min(1), Validators.max(100)]),
      defense: this.fb.nonNullable.control(0, [Validators.required, Validators.min(1), Validators.max(100)]),
      hp: this.fb.nonNullable.control(0, [Validators.required, Validators.min(1), Validators.max(100)]),
      type: this.fb.nonNullable.control('', [Validators.required]),
      idAuthor: this.fb.nonNullable.control(3)
    });
  }

  private pokemonSubscription() {
    this.pokemonService.pokemon$.subscribe({
      next: (data) => {
        this.pokemon = data;
        if (data) {
          const { name, image, attack, defense, hp, type } = data;
          this.addPokemonForm.patchValue({ name, image, attack, defense, hp, type });
        }
      }
    });
  }

  private handleSave(data: Pokemon) {
    this.onSave.emit(data);
    this.addPokemonForm.reset();
    this.pokemonService.setPokemon();
  }
}
