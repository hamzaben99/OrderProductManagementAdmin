import { NgModule } from '@angular/core';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsComponent } from './products.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductItemComponent,
    ProductEditComponent,
    ProductDetailsComponent
  ],
  imports: [
    SharedModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
