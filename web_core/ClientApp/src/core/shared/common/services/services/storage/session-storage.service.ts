import { Injectable } from '@angular/core';
import { StorageBase } from './storage.base';

@Injectable()
export class SessionStorageService extends StorageBase {
  constructor() {
    super(sessionStorage);
  }
}
