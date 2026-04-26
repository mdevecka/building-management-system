import { Component, inject, signal, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, AsyncValidatorFn, ControlContainer } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

export function validateNickname(validator: (name: string) => Observable<boolean>): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (control.value === '')
      return of(null);
    return validator(control.value).pipe(map(res => !res ? { duplicateNickname: true } : null));
  }
}

@Component({
  selector: 'nickname-editor',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './nickname-editor.html',
  styleUrl: './nickname-editor.scss',
  viewProviders: [{
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, { skipSelf: true })
  }],
})
export class NicknameEditor {

  nicknames = input.required<FormArray>();

  validatorFunc = input.required<(name: string) => Observable<boolean>>();

  addItem() {
    this.nicknames().push(new FormControl('', { asyncValidators: [validateNickname((name) => this.validatorFunc()(name))] }));
  }

  removeItem(index: number) {
    this.nicknames().removeAt(index);
  }

}
