import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailResponsePageRoutingModule } from './email-response-routing.module';

import { EmailResponsePage } from './email-response.page';
import { ConfirmPasswordResetComponent } from './components/confirm-password-reset/confirm-password-reset.component';
import { ConfirmEmailAddressComponent } from './components/confirm-email-address/confirm-email-address.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailResponsePageRoutingModule,
    ReactiveFormsModule

  ],
  declarations: [EmailResponsePage, ConfirmPasswordResetComponent, ConfirmEmailAddressComponent]
})
export class EmailResponsePageModule {}
