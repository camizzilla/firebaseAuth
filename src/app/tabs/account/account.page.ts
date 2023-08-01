import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage {

  constructor(
    public authService: AuthService,
    private alertController: AlertController,
    private router: Router
    ) {}

  async deleteAccount(){
    const alert = await this.alertController.create({
      header: 'Stai cancellando il tuo Account',
      message: 'Sei sicuro?',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
          role: 'cancel',
          handler: () => {
            console.log('No');
          }
        },
        {
          text: 'Si',
          cssClass: 'alert-button-confirm',
          role: 'confirm',
          handler: () => {
            this.authService.deleteAccount().then( res => {
              if( res ) {
                this.authService.logout();
                this.router.navigateByUrl('/login', { replaceUrl: true })
              }
            } )
          },
        }
      ]
    })
    await alert.present();
  }
}
