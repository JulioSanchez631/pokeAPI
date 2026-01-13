import { effect, inject, Injectable, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorage } from './local-storage';
import { DOCUMENT } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ModoOscuro {
  servicioLocalStorage = inject(LocalStorage);

  private platformID = inject(PLATFORM_ID);

  modoOscuro = signal<boolean>(
    this.servicioLocalStorage.modoOscuro() ? true : false
  );

  constructor(){
    effect(() => {
      this.servicioLocalStorage.guardarModo(this.modoOscuro());

      if(isPlatformBrowser(this.platformID)){

        if(this.modoOscuro() == true){
          document.body.classList.add('dark-mode');
        }else if(this.modoOscuro() == false){
          document.body.classList.remove('dark-mode');
        }

      }

    })

  }

  cambiarModo(){
    this.modoOscuro.update(valor => !valor);
  }

}
