import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async sendVerificationMail(){
    const loading = await this.loadingController.create();
    await loading.present();

    const res = await this.authService.sendVerificationMail( );

    if( res ) this.router.navigateByUrl('verify-email', { replaceUrl: true })

    await loading.dismiss();
  }

}
