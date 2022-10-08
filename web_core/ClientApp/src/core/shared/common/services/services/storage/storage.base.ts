import { toStringObject } from "../../../helpers/utils/objects.utils";


export abstract class StorageBase {
  storage: any;
  base64Regexp: RegExp;

  constructor(storage: Storage) {
    this.storage = storage;
    this.base64Regexp = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  }

  getItem(key: string, encrypt = false): any {
    const item = this.storage.getItem(key);

    return item && encrypt ? atob(item) : item;
  }

  getItemObject<T>(key: string): T {
    const item = this.getItem(key);

    return (item ? JSON.parse(item) : item) as T;
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  setItem<T = string>(key: string, data: T, encrypt = false): void {
    const value = data ? toStringObject(data) : '';
    this.storage.setItem(key, encrypt ? btoa(value) : value);
  }

  clear(): void {
    this.storage.clear();
  }
}
