import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidators {
  static validOldPassword(
    control: AbstractControl
  ): Promise<ValidationErrors> | null {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (control.value !== '1234') resolve({ invalidOldPassword: true });
        else resolve(null);
      }, 2000);
    });
  }

  static passwordsShouldMatch(control: AbstractControl) {
    let newPassword = control.get('new');
    let confirmPassword = control.get('confirm');

    if (newPassword.value !== confirmPassword.value)
      return { passwordsShouldMatch: true };

    return null;
  }
}
