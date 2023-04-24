import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Remove item', () => {
    let fakeId = 1;
    let fakePokemon = {
      id: fakeId
    } as any;

    beforeEach(() => {
      component.pokemon = fakePokemon;
    });

    it('Debe remover el pokemon si el id coincide', () => {
      component.removeItem(fakeId);

      expect(component.pokemon).toBeFalsy();
    });
  });
});
