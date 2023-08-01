import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private authService: AuthService,
    private router: Router,
    private error: ErrorService ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

	get email() {
		return this.loginForm.get('email');
	}

	get password() {
		return this.loginForm.get('password');
	}

  async login(){
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.login( this.email?.value, this.password?.value);

    await loading.dismiss();

    if( user?._tokenResponse?.registered ){
      if( user?.user?.emailVerified ){
        this.router.navigateByUrl('/tabs', { replaceUrl: true })
      } else {
        this.authService.logout();
        this.router.navigateByUrl('verify-email', { replaceUrl: true })
      }
    } else {
      this.error.errorCode(user);
    }


  }

  goToRegistrationPage(){
    this.router.navigateByUrl('/registration', { replaceUrl: true })
  }

  goToResetPasswordPage(){
    this.router.navigateByUrl('/password-recovery', { replaceUrl: true })
  }

}


