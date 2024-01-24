import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function strictMin(minValue: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const inputValue = control.value;

    if (inputValue && inputValue <= minValue) {
      return { minStrict: { minValue } };
    }

    return null;
  };
}
