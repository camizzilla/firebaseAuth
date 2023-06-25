import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor( private alertController: AlertController ) { }

  async showAlert( header: string, message:string ){
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Ok']
    })
    await alert.present();
  }

  errorCode( code: string){
    switch (code) {
      case 'auth/wrong-password':
        this.showAlert( 'Password Errata', 'Riprova' );
        break;
      case 'auth/user-not-found':
        this.showAlert( 'Utente non trovato', 'Riprova' );
        break;
      case 'auth/too-many-requests':
        this.showAlert( 'Troppe richieste', 'Aspetta e riprova' );
        break;

      default:
        this.showAlert( 'Errore generico', 'Contatta l\'assistenza' );
        break;
    }
  }
}
