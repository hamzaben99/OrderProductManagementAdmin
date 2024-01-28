import { NgModule } from '@angular/core';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersComponent } from './orders.component';
import { SharedModule } from '../shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { EditDialogEntryComponent } from './dialog-entry/edit-dialog-entry.component';
import { DetailsDialogEntryComponent } from './dialog-entry/details-dialog-entry.component';


@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailsComponent,
    OrdersTableComponent,
    OrderEditComponent,
    EditDialogEntryComponent,
    DetailsDialogEntryComponent,
  ],
  imports: [
    SharedModule,
    OrdersRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ]
})
export class OrdersModule { }
