import { FormGroup } from '@angular/forms';

export function markAsTouchedForm(form: FormGroup) {
  Object.values(form.controls).forEach((control) => {
    control.markAsTouched();
  });
}
