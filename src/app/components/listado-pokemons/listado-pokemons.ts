import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { APIservice } from '../../services/apiservice';

import { TarjetaPokemon } from '../tarjeta-pokemon/tarjeta-pokemon';

@Component({
  selector: 'app-listado-pokemons',
  imports:  [TarjetaPokemon],
  templateUrl: './listado-pokemons.html',
  styleUrl: './listado-pokemons.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListadoPokemons {
  servicioAPI = inject(APIservice);

  ngOnInit(){
    // this.servicioAPI.getPokemons();
  }

  listadoPokemons(){
    const pokemons = this.servicioAPI.state().pokemons;
    const arrayPokemons = Array.from(pokemons);

    const informacionPokeItem = arrayPokemons.map((item) => {
      return item[1];
    })

    return informacionPokeItem;
  }

  eliminarPokemon(id : number){
    console.log(`Pokemon eliminado: ${id}`);
    const pokemons = this.servicioAPI.state().pokemons;
    
    pokemons.delete(id);

    console.log(pokemons);

    this.servicioAPI.state.update((valores) => {

    return {
              ...valores,
              pokemons: pokemons
          };
    })

  }

  marcarPokemon(id : number){
    console.log(`Recibido: ${id}`);

    const pokemons = this.servicioAPI.state().pokemons;

    const pokemonBusqueda = pokemons.get(id);

    if(pokemonBusqueda){
      pokemonBusqueda.marcado = !pokemonBusqueda.marcado;
    }

    this.servicioAPI.state.update((valores) => {
      return { ...valores,
        pokemons: pokemons
      }
    })

  }


}
