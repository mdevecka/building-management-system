import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { NicknameEditor, validateNickname } from '../nickname-editor/nickname-editor';
import { BuildingApi } from '../services';

@Component({
  selector: 'building',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, ReactiveFormsModule, NicknameEditor],
  templateUrl: './building.html',
  styleUrl: './building.scss'
})
export class Building {

  protected buildingApi = inject(BuildingApi);

  form = new FormGroup({
    address: new FormControl(''),
    description: new FormControl(''),
    nicknames: new FormArray([]),
  });

  get nicknames() {
    return this.form.get('nicknames') as FormArray;
  }

  ngOnInit() {
    // in final app id would be taken from route params
    const id = 0;
    this.buildingApi.getBuildingInfo(id).subscribe(res => {
      this.form.controls.address.setValue(res.address);
      this.form.controls.description.setValue(res.description);
      for (const nickname of res.nicknames) {
        this.nicknames.push(new FormControl(nickname, { asyncValidators: [validateNickname(this.buildingApi.isValidNickname)] }));
      }
    });
  }

  saveForm() {
    console.log('!save', this.form.value);
  }

}
