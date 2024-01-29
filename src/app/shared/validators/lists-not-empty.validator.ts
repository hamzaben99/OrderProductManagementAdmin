import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function listsNotEmpty(names: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const allListsAreEmpty = names
      .map((name) => control.get(name).value)
      .reduce((acc, curr) => acc && curr.length === 0, true);

    if (allListsAreEmpty) {
      return { listsNotEmpty: !allListsAreEmpty };
    }

    return null;
  };
}
