import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';
import { PokemonService } from '../../services/pokemon.service';

describe('ListItemComponent', () => {
  const pokemonServiceStub = {
    deletePokemon: () => {},
    setPokemon: () => {}
  }

  const fakeData = {
    id: 1,
    name: 'fake name'
  }

  let component: ListItemComponent;
  let pokemonService: PokemonService;
  let fixture: ComponentFixture<ListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemComponent ],
      providers: [
        {
          provide: PokemonService,
          useValue: pokemonServiceStub
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    component.pokemon = fakeData as any;
    fixture.detectChanges();

    pokemonService =  TestBed.get(PokemonService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Eliminar pokemon', () => {
    let deleteSpy: jasmine.Spy;
    let onDeleteSpy: jasmine.Spy;

    const fakeObservable = {
      subscribe: (options: { next: Function }) => {
        options.next();
      }
    } as any;

    beforeEach(() => {
      deleteSpy = spyOn(pokemonService, 'deletePokemon').and.returnValue(fakeObservable);
      onDeleteSpy = spyOn(component.onDelete, 'emit');
    });

    it('Debe emitir el id en onDelete', () => {
      component.delete();

      expect(onDeleteSpy).toHaveBeenCalledWith(fakeData.id);
    });
  });

  describe('Editar pokemon', () => {
    let setPokemonSpy: jasmine.Spy;

    beforeEach(() => {
      setPokemonSpy = spyOn(pokemonService, 'setPokemon');
    });

    it('Debe llamar el servicio con el pokemon', () => {
      component.edit();

      expect(setPokemonSpy).toHaveBeenCalledWith(component.pokemon);
    })
  });
});
