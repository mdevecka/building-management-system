export class NicknameEditorObject {

  get rows() { return Array.from(this.elem.querySelectorAll('.row')).map(r => new NicknameEditorRowObject(r as HTMLElement)); }
  get addButton() { return this.elem.querySelector('.add-button') as HTMLButtonElement; }

  constructor(private elem: HTMLElement) {
  }

}

export class NicknameEditorRowObject {

  get input() { return this.elem.querySelector('input') as HTMLInputElement; }
  get deleteButton() { return this.elem.querySelector('.delete-button') as HTMLButtonElement; }

  constructor(private elem: HTMLElement) {
  }

}
