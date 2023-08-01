import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  changePasswordForm!: FormGroup;
  showPassword: boolean = false;

  constructor( private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)], Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    }, { validators: this.passwordMatchValidator } );
  }

  get oldPassword() {
		return this.changePasswordForm.get('oldPassword');
	}

	get password() {
		return this.changePasswordForm.get('password');
	}

  get confirmPassword() {
		return this.changePasswordForm.get('confirmPassword');
	}


  async changePassword(){
    const loading = await this.loadingController.create();
    await loading.present();

    const res = this.authService.changePassword( this.oldPassword?.value, this.confirmPassword?.value);

    await loading.dismiss();

    // if( user ) {
    //   this.authService.logout();
    //   this.router.navigateByUrl('verify-email', { replaceUrl: true })
    // } else {
    //   this.showAlert('Registration failed', 'Please try again');
    // }
  }



  private passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup?.get('password');
    const confirmPassword = formGroup?.get('confirmPassword');
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
