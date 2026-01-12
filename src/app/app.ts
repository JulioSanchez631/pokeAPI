import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListadoPokemons } from './components/listado-pokemons/listado-pokemons';

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

import { APIservice } from './services/apiservice';
import { ModoOscuro } from './services/modo-oscuro';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListadoPokemons, MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected readonly title = signal('pokeAPI_Angular21');

  servicioModoOscuro = inject(ModoOscuro)
  servicioAPI = inject(APIservice);

  obtenerPokemons(){
    this.servicioAPI.getPokemons();
  }

  modoOscuro(){
    this.servicioModoOscuro.cambiarModo();
  }
}
