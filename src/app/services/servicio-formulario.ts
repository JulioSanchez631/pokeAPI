import { Injectable } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ServicioFormulario {
  formPoke = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.maxLength(15)
    ]),
    imgURL: new FormControl('', Validators.required)
  })
}
