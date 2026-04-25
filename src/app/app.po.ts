import { BuildingObject } from './building/building.po';

export class AppObject {

  get building() { return new BuildingObject(this.elem.querySelector('building') as HTMLElement); }

  constructor(private elem: HTMLElement) {
  }

}
