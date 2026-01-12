import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, mergeMap, Observable, take} from 'rxjs';
import { formateoPokemons } from '../adapters/pokemon.adapter';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorage } from './local-storage';
import { Pokemon } from '../models';

@Injectable({
  providedIn: 'root',
})
export class APIservice {
  private URL = 'https://pokeapi.co/api/v2/';
  private HTTP = inject(HttpClient);

  private localStorageServicio = inject(LocalStorage);

  private plataformaID = inject(PLATFORM_ID);

  state = signal({
    pokemons: this.localStorageServicio.obtenerPokemons()
  })

  constructor(){

    effect(() => {
      const mapaActual = this.state().pokemons

      this.localStorageServicio.guardarPokemons(mapaActual);
    })

  }

  getPokemons() : void {

    const cantidadPokemons = 20

    const API = this.HTTP.get<any>(`${this.URL}/pokemon?limit=${cantidadPokemons}`);

    API.subscribe((datos) => {
    
        API.pipe(

          mergeMap(respuesta => {
            
            const detalles = respuesta.results.map((item : any) => {
              return this.HTTP.get<any>(item.url);
            })
    
            return forkJoin(detalles);
          }),
          map(detalles => formateoPokemons(detalles)),
          take(1)
    
        ).subscribe(pokemons => {

          this.state.update((valores) => {

            valores.pokemons = new Map <number, Pokemon>;
            
              const listado = valores.pokemons;

              pokemons.forEach(item => {
                listado.set(item.id,item);
              })

              return {
                ...valores,
                pokemons: listado
              };
            
          });

          // Realizar guardado del signal en LocalStorage.
          this.localStorageServicio.guardarPokemons(this.state().pokemons);
    
        })

      // } else{
      //   console.log('Sigue igual todo');
      // }
    
    })

  }
}
