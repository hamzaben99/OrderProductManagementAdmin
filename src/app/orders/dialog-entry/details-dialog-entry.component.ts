import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  OrderDetailsComponent,
  OrderDetailsResult,
} from '../order-details/order-details.component';
import { OrderService } from '../order.service';
import { SNACK_BAR_DURATION } from '../../shared/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { ProductService } from '../../products/product.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-details-dialog-entry',
  template: '',
})
export class DetailsDialogEntryComponent implements OnInit {
  private currOrder: Order;

  constructor(
    private snackBar: MatSnackBar,
    private orderService: OrderService,
    private productService: ProductService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // open Dialog here
    this.openDialog();
  }

  private openDialog() {
    this.fetchOrder();

    const dialogRef = this.dialog.open(OrderDetailsComponent, {
      data: { order: this.currOrder },
      /* write config here */
    });

    dialogRef.afterClosed().subscribe((result: OrderDetailsResult) => {
      if (result)
        this.router.navigate(result.navigate, { relativeTo: this.route });
      else this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  private fetchOrder() {
    forkJoin({
      order: this.orderService.fetchOrderById(
        +this.route.snapshot.params['id']
      ),
      products: this.productService.fetchProducts(),
    }).subscribe({
      next: (value) =>
        (this.currOrder = this.orderService.getOrderWithProducts(
          value.order,
          value.products
        )),
      error: (err) => {
        this.snackBar.open(`Failed to load order: ${err.message}`, 'dismiss', {
          duration: SNACK_BAR_DURATION,
          panelClass: 'fail',
        });
        this.router.navigate(['../'], { relativeTo: this.route });
      },
    });
  }
}
