import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  registrationForm!: FormGroup;
  showPassword: boolean = false;

  constructor( private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)], Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    }, { validators: this.passwordMatchValidator } );
  }

	get username() {
		return this.registrationForm.get('username');
	}

	get password() {
		return this.registrationForm.get('password');
	}

  get confirmPassword() {
		return this.registrationForm.get('confirmPassword');
	}

  async register(){
    const loading = await this.loadingController.create();
    await loading.present();

    let username = this.username?.value;
    let password = this.password?.value;

    const user = await this.authService.register( username, password );

    await loading.dismiss();

    if( user ) {
      this.authService.logout();
      this.router.navigateByUrl('verify-email', { replaceUrl: true })
    } else {
      this.showAlert('Registration failed', 'Please try again');
    }
  }

  async showAlert( header: string, message:string ){
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Ok']
    })
    await alert.present();
  }

  goToLoginPage(){
    this.router.navigateByUrl('/auth/login', { replaceUrl: true })
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
