import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import {
  OrderEditComponent,
  OrderEditResult,
} from '../order-edit/order-edit.component';
import { SNACK_BAR_DURATION } from '../../shared/constants';
import { forkJoin, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../products/product.service';
import { OrderService } from '../order.service';
import { Order } from '../../models/order.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-edit-dialog-entry',
  template: '',
})
export class EditDialogEntryComponent {
  private order: Order;
  private products: Product[];

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
    const isEditMode = this.route.snapshot.params['id'] != null;
    this.fetchOrderAndProducts(isEditMode);

    const dialogRef = this.dialog.open(OrderEditComponent, {
      disableClose: true,
      data: {
        order: this.order,
        products: this.products,
      },
      /* write config here */
    });

    dialogRef.afterClosed().subscribe((result: OrderEditResult) => {
      if (result)
        this.router.navigate(result.navigate, { relativeTo: this.route });
      else this.router.navigate(['/orders']);
    });
  }

  private fetchOrderAndProducts(isEditMode: boolean) {
    forkJoin({
      order: isEditMode
        ? this.orderService.fetchOrderById(+this.route.snapshot.params['id'])
        : of(null),
      products: this.productService.fetchProducts(),
    }).subscribe({
      next: (value) => {
        this.order = value.order;
        this.products = value.products;
      },
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
