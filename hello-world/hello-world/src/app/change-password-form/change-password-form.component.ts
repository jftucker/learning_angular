import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PasswordValidators } from './password.validators';

@Component({
  selector: 'change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css'],
})
export class ChangePasswordFormComponent {
  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group(
      {
        old: ['', Validators.required, PasswordValidators.validOldPassword],
        new: ['', Validators.required],
        confirm: ['', Validators.required],
      },
      {
        validator: PasswordValidators.passwordsShouldMatch,
      }
    );
  }

  get old(): AbstractControl {
    return this.form.get('old');
  }

  get new(): AbstractControl {
    return this.form.get('new');
  }

  get confirm(): AbstractControl {
    return this.form.get('confirm');
  }
}
