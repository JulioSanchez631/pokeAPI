import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, mergeMap, Observable, take} from 'rxjs';
import { formateoPokemons } from '../adapters/pokemon.adapter';
import { LocalStorage } from './local-storage';
import { isPlatformBrowser } from '@angular/common';

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
  });

  getPokemons() : void {

    const API = this.HTTP.get<any>(`${this.URL}/pokemon?limit=10`);

    API.subscribe((datos) => {
      console.log(datos.resuls);
    
      if(datos.results.length != Array.from(this.state().pokemons).length){
        console.log('Hay cambios');

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

      } else{
        console.log('Sigue igual todo');
      }
    
    })

  }
}
