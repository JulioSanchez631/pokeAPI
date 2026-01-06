import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { APIservice } from '../../services/apiservice';

@Component({
  selector: 'app-listado-pokemons',
  imports: [],
  templateUrl: './listado-pokemons.html',
  styleUrl: './listado-pokemons.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListadoPokemons {
  servicioAPI = inject(APIservice);

  ngOnInit(){
    this.servicioAPI.getPokemons();
  }

  listadoPokemons(){
    const pokemons = this.servicioAPI.state().pokemons;
    const arrayPokemons = Array.from(pokemons);

    const informacionPokeItem = arrayPokemons.map((item) => {
      return item[1];
    })

    console.log(informacionPokeItem);
    
    return informacionPokeItem;
  }
}
