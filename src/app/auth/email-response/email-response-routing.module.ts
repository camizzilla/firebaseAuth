import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailResponsePage } from './email-response.page';

const routes: Routes = [
  {
    path: '',
    component: EmailResponsePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailResponsePageRoutingModule {}
