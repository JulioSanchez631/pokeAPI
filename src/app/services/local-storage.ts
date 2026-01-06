import { Injectable,PLATFORM_ID,signal,inject } from '@angular/core';
import { Pokemon } from '../models';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  
  private plataformaID = inject(PLATFORM_ID);

  guardarPokemons(pokemons : Map<number, Pokemon[]>){

    if(isPlatformBrowser(this.plataformaID)){

    // console.log(pokemons);

    const arrayPokemons = Array.from(pokemons);

    // console.log(arrayPokemons);

    localStorage.setItem('pokeDatos',JSON.stringify(arrayPokemons));
  
    this.obtenerPokemons();
    }
  }

  /*   state = signal({
  pokemons: new Map<number, any>()
}); */

  obtenerPokemons(){

    
    if(isPlatformBrowser(this.plataformaID)){
      // localStorage.removeItem('pokeDatos');

      const pokemonsDatos = localStorage.getItem('pokeDatos');

      if(pokemonsDatos){
        
        const arrayPokemons = JSON.parse(pokemonsDatos);
  
        const map = new Map<number , any>();
  
        arrayPokemons.forEach((item : any) => {
          map.set(item[0],item[1]);
        })
  
        return map;
  
      }

    }

    const map = new Map<number, any>();
    return map;
    

  }

}
