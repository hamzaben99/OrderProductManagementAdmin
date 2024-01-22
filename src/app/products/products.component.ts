import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from './product.service';
import { Subject, takeUntil } from 'rxjs';
import { SNACK_BAR_DURATION } from '../shared/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit, OnDestroy {
  private destroy = new Subject<void>();

  products: Product[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productService.productsChanged
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        this.loadData();
      });
    this.productService.productsChanged.next();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private loadData() {
    this.productService.fetchProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
      },
      error: (err) => {
        this.snackBar.open(
          `Failed to fetch products: ${err.message}`,
          'dismiss',
          {
            duration: SNACK_BAR_DURATION,
            panelClass: 'fail',
          }
        );
      },
    });
  }

  onAddProduct() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
