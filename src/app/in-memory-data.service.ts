import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Cantor } from './cantor';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const cantores = [
      { id: 11, name: 'Billie Eilish' },
      { id: 12, name: 'Lil Nash X' },
      { id: 13, name: 'Katy Perry' },
      { id: 14, name: 'Ariana Grande' },
      { id: 15, name: 'Lana Del Rey' },
      { id: 16, name: 'Khalid' },
      { id: 17, name: 'BoA' },
      { id: 18, name: 'BTS' },
      { id: 19, name: 'BlackPink' },
      { id: 20, name: 'CLC' }
    ];
    return {cantores};
  }

  genId(cantores: Cantor[]): number {
    return cantores.length > 0 ? Math.max(...cantores.map(cantor => cantor.id)) + 1 : 11;
  }
}