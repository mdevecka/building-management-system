import { NicknameEditorObject } from '../nickname-editor/nickname-editor.po';

export class BuildingObject {

  get nicknameEditor() { return new NicknameEditorObject(this.elem.querySelector('nickname-editor') as HTMLElement); }
  get saveButton() { return this.elem.querySelector('.save-button') as HTMLButtonElement; }

  constructor(private elem: HTMLElement) {
  }

}
