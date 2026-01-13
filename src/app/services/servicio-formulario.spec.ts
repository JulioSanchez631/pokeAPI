import { TestBed } from '@angular/core/testing';

import { ServicioFormulario } from './servicio-formulario';

describe('ServicioFormulario', () => {
  let service: ServicioFormulario;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioFormulario);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
