import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { PokemonService } from '../../services/pokemon.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ListComponent } from '../../components/list/list.component';
import { AddPokemonComponent } from '../../components/add-pokemon/add-pokemon.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let pokemonService: PokemonService;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        SearchBarComponent,
        ListComponent,
        AddPokemonComponent
      ],
      providers: [
        FormBuilder,
        PokemonService
      ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    pokemonService = TestBed.get(PokemonService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
