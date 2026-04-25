import { Injectable, inject, computed } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { BuildingInfo } from '../data';

@Injectable({ providedIn: 'root' })
export class BuildingApi {

  isValidNickname(name: string) {
    const delayTime = 500 + 500 * Math.random();
    return of(null).pipe(delay(delayTime), map(() => {
      return (name.startsWith('a'));
    }));
  }

  // dummy endpoint
  getBuildingInfo(id: number): Observable<BuildingInfo> {
    const delayTime = 500 + 500 * Math.random();
    return of(null).pipe(delay(delayTime), map(() => {
      return {
        name: '30 St Mary Axe, London',
        address: '30 St Mary Axe, London',
        description: 'Lorem ipsum dolor sit amen',
        nicknames: ['amax'],
      };
    }));
  }

}
