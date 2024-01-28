import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { EditDialogEntryComponent } from './dialog-entry/edit-dialog-entry.component';
import { DetailsDialogEntryComponent } from './dialog-entry/details-dialog-entry.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    children: [
      { path: 'new', component: EditDialogEntryComponent },
      { path: ':id/edit', component: EditDialogEntryComponent },
      { path: ':id', component: DetailsDialogEntryComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
