import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.page.html',
  styleUrls: ['./change-email.page.scss'],
})
export class ChangeEmailPage implements OnInit {

  changeEmailForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.changeEmailForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

  get email() {
		return this.changeEmailForm.get('email');
	}

  async sendChangeEmailRequest(){
    const loading = await this.loadingController.create();
    await loading.present();

    const res = await this.authService.changeEmail(this.email?.value);

    console.log(res);

    await loading.dismiss();

  }

}
