import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  { 
    path: '', component: ProductsComponent, children: [
      { path: 'add', component: ProductEditComponent },
      { path: ':id/edit', component: ProductEditComponent },
      { path: ':id', component: ProductDetailsComponent }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
