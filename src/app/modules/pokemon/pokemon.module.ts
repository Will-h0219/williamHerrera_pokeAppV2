import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { PokemonRoutingModule } from './pokemon-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ListComponent } from './components/list/list.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { AddPokemonComponent } from './components/add-pokemon/add-pokemon.component';
import { ErrorFatalComponent } from './components/error-fatal/error-fatal.component';


@NgModule({
  declarations: [
    HomeComponent,
    SearchBarComponent,
    ListComponent,
    ListItemComponent,
    AddPokemonComponent,
    ErrorFatalComponent
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    ReactiveFormsModule
  ]
})
export class PokemonModule { }
