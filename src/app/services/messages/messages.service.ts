import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor( private alertController: AlertController ) { }

  async showAlert( header: string, message:string ){
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Ok']
    })
    await alert.present();
  }
}
