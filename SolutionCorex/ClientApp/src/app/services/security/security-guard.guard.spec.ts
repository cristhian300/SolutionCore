import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { SecurityGuardGuard } from './security-guard.guard';

describe('SecurityGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecurityGuardGuard]
    });
  });

  it('should ...', inject([SecurityGuardGuard], (guard: SecurityGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
