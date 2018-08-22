import { TestBed, inject } from '@angular/core/testing';

import { ProductFormService } from './product-form.service';

describe('ProductFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductFormService]
    });
  });

  it('should be created', inject([ProductFormService], (service: ProductFormService) => {
    expect(service).toBeTruthy();
  }));
});
