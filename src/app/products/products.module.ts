import { NgModule } from '@angular/core';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductsComponent } from './products.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductStartComponent } from './product-start/product-start.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductEditComponent,
    ProductDetailsComponent,
    ProductStartComponent
  ],
  imports: [
    SharedModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
