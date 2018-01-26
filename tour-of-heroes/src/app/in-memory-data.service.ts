import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    const heroes = [
      { id: 11, name: 'Superman' },  
      { id: 12, name: 'Wonder Woman' },  
      { id: 13, name: 'Black Canary' },  
      { id: 14, name: 'Mr Fantastic' },  
      { id: 15, name: 'Green Arrow' },  
      { id: 16, name: 'Firestorm' },  
      { id: 17, name: 'Atom' },  
      { id: 18, name: 'The Flash' },  
      { id: 19, name: 'Vibe' },  
      { id: 20, name: 'Gypsy' },  
    ];
    return { heroes };
  }

  constructor() { }

}
