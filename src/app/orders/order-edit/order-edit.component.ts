import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from '../order.service';
import { Order } from '../../models/order.model';
import { SNACK_BAR_DURATION } from '../../shared/constants';
import { Product } from '../../models/product.model';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrl: './order-edit.component.css',
})
export class OrderEditComponent implements OnInit, OnDestroy {
  order: Order;
  currOrderProduct: { productId: number; quantity: number } = {
    productId: null,
    quantity: 1,
  };
  products: Product[];
  isEditMode = false;
  isPreorder = false;
  minDate = new Date();
  orderForm: FormGroup;

  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<OrderEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { order: Order; products: Product[] }
  ) {
    this.initForm();
  }

  get orderProductsControls() {
    return (this.orderForm.get('products') as FormArray).controls;
  }

  ngOnInit(): void {
    this.products = this.data.products;
    this.order = this.data.order;

    if (this.order) {
      this.isPreorder = this.order.preorder;

      this.orderForm.patchValue(this.order);
      this.order.products.forEach((product, index) =>
        (<FormArray>this.orderForm.get('products')).push(
          this.formBuilder.group({
            productId: [product.productId, [Validators.required]],
            quantity: [product.quantity, this.getQuantityValidators(index)],
          })
        )
      );
      this.order = this.data.order;
    }

    this.dialogRef // todo: review this after adding Guards
      .backdropClick()
      .subscribe(() => this.onCloseClicked());
  }

  ngOnDestroy(): void {}

  onPreorderSlideToggleChange(changes: MatSlideToggleChange) {
    this.isPreorder = changes.checked;

    (<FormArray>this.orderForm.get('products')).controls.forEach(
      (control: FormGroup) => {
        control
          .get('quantity')
          .setValidators(
            this.getQuantityValidators(
              this.products.findIndex(
                (p) => p.id === control.get('productId').value
              )
            )
          );
        control.get('quantity').updateValueAndValidity();
      }
    );
  }

  onCloseClicked() {
    const response = window.confirm(
      'are you sure you want to cancel editing this order ?'
    );
    if (response) this.dialogRef.close();
  }

  onSubmit() {
    const observer = {
      next: () => {
        this.snackBar.open(`Order has been saved successfully`, 'dismiss', {
          duration: SNACK_BAR_DURATION,
          panelClass: 'successful',
        })
        this.dialogRef.close();
      },
      error: (err) =>
        this.snackBar.open(`Failed to save order: ${err.message}`, 'dismiss', {
          duration: SNACK_BAR_DURATION,
          panelClass: 'fail',
        }),
    };

    if (!this.isEditMode)
      this.orderService
        .addOrder(this.orderForm.value, this.isPreorder)
        .subscribe(observer);
    else
      this.orderService
        .updateOrder(this.order.id, this.orderForm.value)
        .subscribe(observer);
  }

  onDeleteOrder() {
    if (!this.isEditMode) return;

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
          )
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

  isProductInOrder(productId: number) {
    return (<FormArray>this.orderForm.get('products')).value
      .map((group) => group.productId)
      .includes(productId);
  }

  onAddOrderProduct() {
    if (this.isProductInOrder(this.currOrderProduct.productId)) {
      const orderProductsArray: { productId: number; quantity: number }[] = (<
        FormArray
      >this.orderForm.get('products')).value;

      (<FormArray>this.orderForm.get('products')).patchValue(
        orderProductsArray.map((orderProduct, index) => {
          if (orderProduct.productId !== this.currOrderProduct.productId)
            return orderProduct;
          return {
            productId: this.currOrderProduct.productId,
            quantity:
              orderProductsArray[index].quantity +
              this.currOrderProduct.quantity,
          };
        })
      );
    } else {
      this.products.some((product, index) => {
        if (product.id === this.currOrderProduct.productId) {
          (<FormArray>this.orderForm.get('products')).push(
            this.formBuilder.group({
              productId: [
                this.currOrderProduct.productId,
                [Validators.required],
              ],
              quantity: [
                this.currOrderProduct.quantity,
                this.getQuantityValidators(index),
              ],
            })
          );
          return true;
        }
      });
    }

    this.currOrderProduct = { productId: null, quantity: 1 };
  }

  onOrderProductDeleted(index: number) {
    (<FormArray>this.orderForm.get('products')).removeAt(index);
  }

  private initForm() {
    this.orderForm = this.formBuilder.group({
      client: this.formBuilder.group({
        lastName: ['', [Validators.required]],
        firstName: ['', [Validators.required]],
        phoneNumber: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?:(?:\+|00)[1-9]{1,3}|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
            ),
          ],
        ],
        emailAddress: [''],
      }),
      orderDeliveryDate: [null, [Validators.required]],
      orderDeliveryAddress: [''],
      products: this.formBuilder.array([], Validators.required),
    });
  }

  private getQuantityValidators(index: number) {
    return [
      Validators.required,
      Validators.min(1),
      this.isPreorder
        ? Validators.nullValidator
        : Validators.max(this.products[index].stockQuantity),
    ];
  }

  getOrderProduct(productId: number) {
    return this.products.find((p) => p.id === productId);
  }
}

export type OrderEditResult = { navigate: any[] };
