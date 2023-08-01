import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirm-email-address',
  templateUrl: './confirm-email-address.component.html',
  styleUrls: ['./confirm-email-address.component.scss'],
})
export class ConfirmEmailAddressComponent  implements OnInit {

  isEmailConfirmed!:boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private loadingController: LoadingController,
    ) { }

    async ngOnInit() {
      const loading = await this.loadingController.create();
      await loading.present();

      const code = this.activateRoute.snapshot.queryParams['oobCode'];
      const res = await this.authService.applyActionCode( code );

      await loading.dismiss();

      if( res ) this.isEmailConfirmed = res;
  }

}
