import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { Pokemon } from '../../models';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tarjeta-pokemon',
  imports: [MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './tarjeta-pokemon.html',
  styleUrl: './tarjeta-pokemon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TarjetaPokemon {

  pokemon = input<Pokemon>();

  itemEliminado = output<number>();
  itemMarcado = output<number>();

  eliminado(){
    const idItemPokemon = this.pokemon()?.id;
    
    console.log(typeof idItemPokemon);

    if(idItemPokemon || idItemPokemon == 0){
      this.itemEliminado.emit(idItemPokemon);
    }
  }

  marcado(){
    const idItemPokemon = this.pokemon()?.id;

    if(idItemPokemon || idItemPokemon == 0){
      this.itemMarcado.emit(idItemPokemon);
    }
  }

}
