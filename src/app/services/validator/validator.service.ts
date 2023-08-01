import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  passwordMatchValidator(password: any, confirmPassword: any) {

    if (
      password?.errors &&
      !confirmPassword?.errors?.['confirmPasswordValidator']
    ) {
      return;
    }
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ confirmPasswordValidator: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }
}
