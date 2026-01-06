import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListadoPokemons } from './components/listado-pokemons/listado-pokemons';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListadoPokemons],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected readonly title = signal('pokeAPI_Angular21');
}
