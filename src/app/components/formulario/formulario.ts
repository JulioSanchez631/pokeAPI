import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { ServicioFormulario } from '../../services/servicio-formulario';
import { LocalStorage } from '../../services/local-storage';
import { ListadoPokemons } from '../listado-pokemons/listado-pokemons';
import { APIservice } from '../../services/apiservice';
import { Pokemon } from '../../models';

@Component({
  selector: 'app-formulario',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.scss',
})
export class Formulario {
  formulario = inject(ServicioFormulario);
  servicioAPI = inject(APIservice);

  cambioImgURL(e : Event){
    e.preventDefault();
    
    const input = e.target as HTMLInputElement;
    
    if(input.files && input.files.length > 0){
      const file = input.files[0];

      const reader = new FileReader();
      
      reader.onload = (e : any) => {
        let base64string = e.target.result

          this.formulario.formPoke.patchValue({
            imgURL: base64string
          })
      }
  
      reader.readAsDataURL(file);
    }
  }

  enviar(){

    if(this.formulario.formPoke.valid){

      const arrayPokemons = Array.from(this.servicioAPI.state().pokemons);

      let IDS : number[] = [];

      arrayPokemons.forEach((item : any) => {
        IDS.push(item[0]);
      })

      const IDSordenados = IDS.sort((a, b) => a - b);

      const nuevoID = IDSordenados[0] - 1;

      if(this.formulario.formPoke.value.nombre && this.formulario.formPoke.value.imgURL){

        const pokemon : Pokemon = {
          id: nuevoID,
          nombre: this.formulario.formPoke.value.nombre,
          tipos: '',
          imgURL: this.formulario.formPoke.value.imgURL,
          marcado: false
        }

        // Ahora este pokemon debemos de meterlo en el new Map para que se refleje, recuerda que tienes que hacer un update entero para que sepa el signal que realizamo cambios en el, es decir,
        /*
        return {
          ...valores,
          pokekomns: valor/*
        }
        */
        console.log(pokemon);
        
        this.servicioAPI.state.update((valores) => {
          
          valores.pokemons.set(pokemon.id,pokemon);
          
          return {
            ...valores,
          pokemons: valores.pokemons};
        })

        // Realizar el update correspondiente para que avisar al signal que hubo cambios en el signal y se refresque en el componente.

        console.log(this.servicioAPI.state().pokemons);

      } else{
        console.log('No se recibieron los datos del formulario correctamente.');
      }

      this.formulario.formPoke.reset();

    }
  }
}
