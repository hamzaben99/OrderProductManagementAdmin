import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageAccountRoutingModule } from './manage-account-routing.module';
import { ManageAccountComponent } from './manage-account.component';


@NgModule({
  declarations: [
    ManageAccountComponent
  ],
  imports: [
    CommonModule,
    ManageAccountRoutingModule
  ]
})
export class ManageAccountModule { }
