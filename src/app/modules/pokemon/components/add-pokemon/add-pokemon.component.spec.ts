import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPokemonComponent } from './add-pokemon.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon.service';

describe('AddPokemonComponent', () => {
  const pokemonServiceStub = {
    setPokemon: () => {},
    createPokemon: () => {},
    updatePokemon: () => {},
    pokemon$: {
      subscribe: (options: { next: Function }) => {
        options.next()
      },
      unsubscribe: () => {}
    }
  }

  const fakeForm = {
    value: {
      name: 'fake name',
      img: 'http://fakeimage.jpg',
      attack: 10,
      defense: 10,
      hp: 10,
      type: 'fake type',
      idAuthor: 3
    }
  }

  let component: AddPokemonComponent;
  let pokemonService: PokemonService;
  let fixture: ComponentFixture<AddPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPokemonComponent ],
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

    fixture = TestBed.createComponent(AddPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    pokemonService = TestBed.get(PokemonService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Reset form', () => {
    let setPokemonSpy: jasmine.Spy;
    const initialValueMock = {
      name: '',
      image: '',
      attack: 0,
      defense: 0,
      hp: 0,
      type: '',
      idAuthor: 3
    }

    beforeEach(() => {
      setPokemonSpy = spyOn(pokemonService, 'setPokemon');
    });

    it('Debe reiniciar los valores del form', () => {
      component.addPokemonForm.patchValue(fakeForm.value);
      component.cancel();

      expect(component.addPokemonForm.value).toEqual(initialValueMock);
      expect(setPokemonSpy).toHaveBeenCalled();
    });
  });

  describe('Save data', () => {
    let createSpy: jasmine.Spy;
    let updateSpy: jasmine.Spy;
    let onSaveSpy: jasmine.Spy;

    const fakeCreatePokemon = {
      ...fakeForm,
      id: 1
    }
    const fakeUpdatePokemon = {
      ...fakeForm,
      name: 'new fake name',
      id: 1
    }
    const fakeCreateObservable = {
      subscribe: (options: { next: Function }) => {
        options.next(fakeCreatePokemon);
      }
    } as any;
    const fakeUpdateObservable = {
      subscribe: (options: { next: Function }) => {
        options.next(fakeUpdatePokemon);
      }
    } as any;

    beforeEach(() => {
      createSpy = spyOn(pokemonService, 'createPokemon').and.returnValue(fakeCreateObservable);
      updateSpy = spyOn(pokemonService, 'updatePokemon').and.returnValue(fakeUpdateObservable);
      onSaveSpy = spyOn(component.onSave, 'emit');
    });

    it('Debe llamar la creacion del pokemon', () => {
      component.pokemon = null;
      component.save();

      expect(createSpy).toHaveBeenCalled();
      expect(updateSpy).not.toHaveBeenCalled();
      expect(onSaveSpy).toHaveBeenCalledWith(fakeCreatePokemon);
    });

    it('Debe llamar la actualización del pokemon', () => {
      component.pokemon = fakeCreatePokemon as any;
      component.save();

      expect(updateSpy).toHaveBeenCalled();
      expect(createSpy).not.toHaveBeenCalled();
      expect(onSaveSpy).toHaveBeenCalledOnceWith(fakeUpdatePokemon);
    });
  });

  describe('ngOnDestroy', () => {
    let unsubscribeSpy: jasmine.Spy;

    beforeEach(() => {
      unsubscribeSpy = spyOn(pokemonService.pokemon$, 'unsubscribe');
    });

    it('Debe llamar unsubscribe en destroy', () => {
      component.ngOnDestroy();

      expect(unsubscribeSpy).toHaveBeenCalled();
    });
  });
});
