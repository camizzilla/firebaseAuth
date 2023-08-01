import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirm-password-reset',
  templateUrl: './confirm-password-reset.component.html',
  styleUrls: ['./confirm-password-reset.component.scss'],
})
export class ConfirmPasswordResetComponent  implements OnInit {

  newPasswordForm!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private loadingController: LoadingController ) {}

  ngOnInit() {
    this.newPasswordForm = this.fb.group({
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    }, { validators: this.passwordMatchValidator } );
  }

  get password() {
		return this.newPasswordForm.get('password');
	}

	get confirmPassword() {
		return this.newPasswordForm.get('confirmPassword');
	}

  async setNewPassword(){
    const loading = await this.loadingController.create();
    await loading.present();

    const code = this.route.snapshot.queryParams['oobCode'];
    const res = await this.authService.confirmPasswordReset(code, this.password?.value);

    await loading.dismiss();

    if( res ) this.router.navigateByUrl('login', { replaceUrl: true })
  }

  private passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup?.get('password');
    const confirmPassword = formGroup?.get('confirmPassword');
    if ( password?.errors && !confirmPassword?.errors?.['confirmPasswordValidator']) return;

    (password?.value !== confirmPassword?.value) ?
      confirmPassword?.setErrors({ confirmPasswordValidator: true }) :
      confirmPassword?.setErrors(null);
  }

}
