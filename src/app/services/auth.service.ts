import { Injectable } from '@angular/core';
import { Auth, EmailAuthProvider, User, applyActionCode, confirmPasswordReset, createUserWithEmailAndPassword, deleteUser, reauthenticateWithCredential, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from '@angular/fire/auth';
import { ErrorService } from './error/error.service';
import { MessagesService } from './messages/messages.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private error: ErrorService,
    private message: MessagesService
  ) { }

  async register( email: string, password: string ){
    try {
      const user = await createUserWithEmailAndPassword( this.auth, email, password );
      await sendEmailVerification(user.user);
      return user;
    } catch (error: any) {
      return error.code;
    }
  }

  async login( email: string, password: string ){
    try {
      const user = await signInWithEmailAndPassword( this.auth, email, password );
      return user;
    } catch (error: any) {
      return error.code;
    }
  }

  logout(){
    signOut( this.auth );
  }

  async sendVerificationMail(){
    if (this.auth?.currentUser) {
      return await sendEmailVerification( this.auth?.currentUser )
      .then(() => true )
      .catch( err => {
        this.error.errorCode(err.code);
        return false
      })
    }
    return false;
  }

  async sendPasswordResetRequest(email: string){
    return await sendPasswordResetEmail(this.auth, email)
      .then(() => true )
      .catch( err => {
        this.error.errorCode(err.code);
        return false
      }
    );
  }

  async applyActionCode(code: string){
    return await applyActionCode(this.auth, code)
    .then(() => true )
    .catch( err => {
      this.error.errorCode(err.code);
      return false;
    } );
  }

  async confirmPasswordReset( code: string, password: string ){
    return await confirmPasswordReset(this.auth, code, password)
    .then(() => true )
    .catch(err => {
      this.error.errorCode(err.code);
      return false;
    })
  }

  async changeEmail( newEmail: string ){
    return await updateEmail( this.currentUser, newEmail)
    .then(() => {
      this.message.showAlert('Modifica email','Email modificata correttamente');
      return true
    } )
    .catch(err => {
      this.error.errorCode(err.code);
      return false;
    })
  }

  async changePassword( oldPassword: string, newPassword: string){
    const credential =  await EmailAuthProvider.credential( this.email, oldPassword );
     reauthenticateWithCredential( this.currentUser, credential)
     .then((res) => {
        updatePassword( this.currentUser, newPassword)
        .then(() => {
          this.message.showAlert('Modifica password','Password modificata correttamente');
          return true
        } )
        .catch( err => {
          this.error.errorCode(err.code);
          return false;
        });
      }).catch( err => {
        this.error.errorCode(err.code);
        return false;
      });
    return ''
  }

  async deleteAccount(){
    return await deleteUser( this.currentUser )
      .then(() => true)
    .catch(err => {
      this.error.errorCode(err.code);
      return false;
    })
  }



  get email(){
    return this.auth?.currentUser?.email as string;
  }

  get currentUser(): User{
    return this.auth?.currentUser as User;
  }

//   const user = firebase.auth().currentUser;

// user.updatePassword(newPassword).then(() => {
//   // Update successful.
// }).catch((error) => {
//   // An error ocurred
//   // ...
// });



  // Controllare se la login è scaduta e riloggarsi
  // user.reauthenticateWithCredential(credentials)

//   const user = firebase.auth().currentUser;

// // TODO(you): prompt the user to re-provide their sign-in credentials
// const credential = promptForCredentials();

// user.reauthenticateWithCredential(credential).then(() => {
//   // User re-authenticated.
// }).catch((error) => {
//   // An error occurred
//   // ...
// });
}
