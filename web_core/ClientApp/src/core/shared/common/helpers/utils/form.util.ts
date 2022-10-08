import { AbstractControl, FormGroup } from '@angular/forms';

export class FormUtil {
  static reset(form: FormGroup): void {
    form.reset();

    Object.keys(form.controls).forEach((field) => {
      form.get(field).markAsUntouched();
      form.get(field).markAsPristine();
    });
  }

  static resetControl(control: AbstractControl): void {
    control.markAsUntouched();
    control.markAsPristine();
  }

  static clearAndResetControl(control: AbstractControl): void {
    control.setValue(null);
    control.markAsUntouched();
    control.markAsPristine();
  }

  static resetAndErrorNull(control: AbstractControl): void {
    control.markAsTouched();
    control.markAsPristine();
    setTimeout(() => control.setErrors(null));
  }

  static validateAllControls(form: FormGroup): void {
    Object.keys(form.controls).forEach((field) => {
      const control = form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  static disabledAndClear(control: AbstractControl): void {
    control.setValue(null);
    control.disable();
    control.markAsUntouched();
    control.markAsPristine();
    setTimeout(() => control.setErrors(null));
  }
}
