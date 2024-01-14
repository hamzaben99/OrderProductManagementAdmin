import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../order.service';
import { Order } from '../../models/order.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACK_BAR_DURATION } from '../../shared/constants';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent implements OnInit {
  order: Order;

  constructor(
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<OrderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { order: Order }
  ) {}

  ngOnInit(): void {
    this.order = this.data.order;
  }

  onEditOrder() {
    this.dialogRef.close({ navigate: ['edit'] });
  }

  onValidateOrder() {
    this.orderService.validateOrder(this.order.id).subscribe({
      next: () => {
        this.snackBar.open(
          `Order No. ${this.order.id} has been validated successfully`,
          'dismiss',
          {
            duration: SNACK_BAR_DURATION,
            panelClass: 'successful',
          }
        );
        this.dialogRef.close();
      },
      error: (err) =>
        this.snackBar.open(
          `Failed to validate order No. ${this.order.id}: ${err.message}`,
          'dismiss',
          {
            duration: SNACK_BAR_DURATION,
            panelClass: 'fail',
          }
        ),
    });
  }

  onDeleteOrder() {
    const response = window.confirm(
      'are you sure you want to delete this order ?'
    );
    if (response) {
      this.orderService.deleteOrder(this.order.id).subscribe({
        next: () => {
          this.snackBar.open(
            `Order ${this.order.id} has been deleted successfully`,
            'dismiss',
            {
              duration: SNACK_BAR_DURATION,
              panelClass: 'successful',
            }
          ),
            this.dialogRef.close();
        },
        error: (err) =>
          this.snackBar.open(
            `Failed to delete order: ${err.message}`,
            'dismiss',
            {
              duration: SNACK_BAR_DURATION,
              panelClass: 'fail',
            }
          ),
      });
    }
  }

  totalQuantity() {
    return this.order.products
      .map((p) => p.quantity)
      .reduce((prev, curr) => prev + curr);
  }

  totalPrice() {
    return this.order.products
      .map((p) => p.quantity * p.product.unitPrice)
      .reduce((prev, curr) => prev + curr);
  }
}

export type OrderDetailsResult = { navigate: any[] };
