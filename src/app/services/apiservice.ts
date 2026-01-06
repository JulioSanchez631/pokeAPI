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

    // Aquí hay un problema, que si se llega a cambiar la petición GET de la API, al tener guardada una versión antigua en LocalStorage no se va a mostrar en el HTML, entonces tendrias que borrar el local storage con removeItem, se necesita cambiar la logica de esta condicional.
    if(!this.state().pokemons.size){

      this.HTTP.get<any>(`${this.URL}/pokemon?limit=22`).pipe(
  
        mergeMap(respuesta => {
          
          const detalles = respuesta.results.map((item : any) => {
            return this.HTTP.get<any>(item.url);
          })
  
          return forkJoin(detalles);
        }),
        map(detalles => formateoPokemons(detalles)),
        take(1)
  
      ).subscribe(pokemons => {
        // Guardarlo en el signal y mata la suscripción porfavor, es decir, cuando el componente deje de existir
        // Con eso tendríamos el get realizado, el signal que debes de usar, como fuente de la verdad absoluta es state.
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
      console.log('Ejecutado.');
    }

  }
}
