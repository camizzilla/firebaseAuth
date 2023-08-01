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
        this.showAlert( 'Troppe richieste effettuate', 'Aspetta e riprova' );
        break;
      case 'auth/network-request-failed':
        this.showAlert( 'Connessione fallita', 'Per favore controlla la tua connessione internet' );
      break;
      case 'auth/user-disabled':
        this.showAlert( 'Il tuo account è stato disabilitato o cancellato', 'Per favore, contatta l\'amministratore' );
      break;
      case 'auth/user-disabled':
        this.showAlert( 'Il tuo account è stato disabilitato o cancellato', 'Per favore, contatta l\'amministratore' );
      break;
      case 'auth/user-disabled':
        this.showAlert( 'Problemi con il login', 'Per favore, prova a riloggarti' );
      break;
      case 'auth/user-disabled':
        this.showAlert( 'Problemi con il login', 'Per favore, prova a riloggarti' );
      break;
      case 'auth/user-disabled':
        this.showAlert( 'Email esistete', 'Questa email è già stata usata da un utente' );
      break;
      case 'auth/invalid-email':
        this.showAlert( 'Email non valida', 'Questa non è un email valida' );
        break;
      case 'auth/cannot-delete-own-user-account':
        this.showAlert( 'Permesso negato', 'Non puoi cancellare questo account' );
        break;
      case 'auth/expired-action-code':
        this.showAlert( 'Codice scaduto', 'Riprova' );
        break;
      case 'auth/expired-action-code':
        this.showAlert( 'Codice non valido', 'Riprova' );
        break;

      default:
        this.showAlert( 'Errore generico', 'Contatta l\'assistenza' );
        break;
    }
  }
}
