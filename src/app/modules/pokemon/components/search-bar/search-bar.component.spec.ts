import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon.service';

describe('SearchBarComponent', () => {
  const pokemonServiceStub = {
    getPokemon: () => {}
  }

  let component: SearchBarComponent;
  let pokemonService: PokemonService
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ],
      providers: [
        FormBuilder,
        {
          provide: PokemonService,
          useValue: pokemonServiceStub
        }
      ],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    pokemonService = TestBed.get(PokemonService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Search pokemon', () => {
    let callFailed = false;
    let searchSpy: jasmine.Spy;
    let onSearchSpy: jasmine.Spy;

    const fakeForm = {
      value: {
        searchField: 'Fake data'
      }
    } as any;

    const fakeData = {
      id: 1,
      name: 'fake Name'
    } as any;

    const fakeObservable = {
      subscribe: (options: { next: Function, error: Function }) => {
        if (callFailed) {
          options.error();
        } else {
          options.next(fakeData);
        }
      }
    } as any;

    beforeEach(() => {
      searchSpy = spyOn(pokemonService, 'getPokemon').and.returnValue(fakeObservable);
      onSearchSpy = spyOn(component.onSearch, 'emit');

      component.searchForm = fakeForm;
    });

    it('Debe emitir el resultado al buscar', () => {
      callFailed = false;
      component.search();

      expect(onSearchSpy).toHaveBeenCalledWith(fakeData);
    });

    it('Debe emitir null en error', () => {
      callFailed = true;
      component.search();

      expect(onSearchSpy).toHaveBeenCalledWith(null);
    })

    it('No debe llamar ningun metodo si no hay searchForm no tiene valor', () => {
      component.searchForm = {} as any;

      expect(onSearchSpy).not.toHaveBeenCalled();
      expect(searchSpy).not.toHaveBeenCalled();
    });
  });
});
