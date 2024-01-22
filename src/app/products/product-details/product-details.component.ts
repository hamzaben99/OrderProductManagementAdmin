import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACK_BAR_DURATION } from '../../shared/constants';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product = new Product('Unknown', 0, 0, 'Unknown', -1, 'Unknown');

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) =>
          this.productService.fetchProductById(+params['id'])
        )
      )
      .subscribe((product: Product) => (this.product = product));
  }

  onDeleteProduct() {
    const response = window.confirm(
      'are you sure you want to delete this product ?'
    );
    if (response) {
      this.productService.deleteProduct(this.product.id).subscribe({
        next: () =>
          this.snackBar.open(
            `Product ${this.product.id} has been deleted successfully`,
            'dismiss',
            {
              duration: SNACK_BAR_DURATION,
              panelClass: 'successful',
            }
          ),
        error: (err) =>
          this.snackBar.open(
            `Failed to delete product: ${err.message}`,
            'dismiss',
            {
              duration: SNACK_BAR_DURATION,
              panelClass: 'fail',
            }
          ),
      });
    }
  }

  onEditProduct() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
