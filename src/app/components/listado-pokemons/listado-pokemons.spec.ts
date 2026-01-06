import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPokemons } from './listado-pokemons';

describe('ListadoPokemons', () => {
  let component: ListadoPokemons;
  let fixture: ComponentFixture<ListadoPokemons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoPokemons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoPokemons);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
