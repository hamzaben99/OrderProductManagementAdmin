import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../product.service';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { strictMin } from '../../shared/strict-min.validator';
import { SNACK_BAR_DURATION } from '../../shared/constants';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})
export class ProductEditComponent {
  product: Product = new Product('', 0, 0, '', 'assets/imgs/question-mark.png');
  productForm: FormGroup;
  isEditMode = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.isEditMode = this.route.snapshot.params['id'] != null;

    if (this.isEditMode) {
      this.productService
        .fetchProductById(+this.route.snapshot.params['id'])
        .subscribe((product: Product) => {
          this.product = product;
          this.productForm.patchValue(this.product);
        });
    }
  }

  onSaveProduct() {
    console.log(this.productForm);
    const observer = {
      next: () => {
        this.snackBar.open(`Product has been saved successfully`, 'dismiss', {
          duration: SNACK_BAR_DURATION,
          panelClass: 'successful',
        });
        this.router.navigate(['products']);
      },
      error: (err) =>
        this.snackBar.open(
          `Failed to save product: ${err.message}`,
          'dismiss',
          {
            duration: SNACK_BAR_DURATION,
            panelClass: 'fail',
          }
        ),
    };

    if (!this.isEditMode)
      this.productService
        .addProduct(this.productForm.value)
        .subscribe(observer);
    else
      this.productService
        .updateProduct(this.product.id, this.productForm.value)
        .subscribe(observer);
  }

  private initForm() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      unitPrice: ['', [Validators.required, strictMin(0)]],
      stockQuantity: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]],
      imgPath: ['', [Validators.required]], // todo: upload img
    });
  }
}
