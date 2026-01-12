import { TestBed } from '@angular/core/testing';

import { ModoOscuro } from './modo-oscuro';

describe('ModoOscuro', () => {
  let service: ModoOscuro;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModoOscuro);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
