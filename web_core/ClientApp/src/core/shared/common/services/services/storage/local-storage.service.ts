import { Injectable } from '@angular/core';
import { StorageBase } from './storage.base';

@Injectable()
export class LocalStorageService extends StorageBase {
  constructor() {
    super(localStorage);
  }
}
