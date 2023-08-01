import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage implements OnInit {

  pswResetForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private router: Router ) { }

  ngOnInit() {
    this.pswResetForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

  get email() {
		return this.pswResetForm.get('email');
	}

  async sendPasswordResetRequest(){
    const loading = await this.loadingController.create();
    await loading.present();

    const res = await this.authService.sendPasswordResetRequest(this.email?.value);

    await loading.dismiss();

    if( res ) this.router.navigateByUrl('login', { replaceUrl: true });
  }

  goToLoginPage(){
    this.router.navigateByUrl('/auth/login', { replaceUrl: true })
  }

}
