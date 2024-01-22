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

    forkJoin({
      order: isEditMode
        ? this.orderService.fetchOrderById(+this.route.snapshot.params['id'])
        : of(null),
      products: this.productService.fetchProducts(),
    }).subscribe({
      next: (value) => {
        const order = value.order;
        const products = value.products;

        const dialogRef = this.dialog.open(OrderEditComponent, {
          disableClose: true,
          data: {
            order: order,
            products: products,
          },
          /* write config here */
        });
    
        dialogRef.afterClosed().subscribe((result: OrderEditResult) => {
          if (result)
            this.router.navigate(result.navigate, { relativeTo: this.route });
          else this.router.navigate(['/orders']);
        });
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
