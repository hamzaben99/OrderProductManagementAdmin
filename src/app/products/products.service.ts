import { Injectable } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { Product } from '../models/product.model';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _products: Product[] = DUMMY_PRODUCTS;//[];
  productsChanged = new Subject<Product[]>();
  private url = 'api/products';

  constructor(private httpService: HttpService) {}

  get products() {
    return this._products.slice();
  }

  fetchProducts() {
    this.httpService.getData<Product[]>(this.url).subscribe((products) => {
      this._products = products;
      this.productsChanged.next(this.products);
    });
  }

  fetchProductById(id: number) {
    return this.httpService.getData<Product>(`${this.url}/${id}`);
  }

  addProduct(product: Product) {
    this.httpService
      .postData<Product>(this.url, product)
      .subscribe(() => this.fetchProducts());
  }

  updateProduct(id: number, product: Product) {
    return this.httpService
      .putData<Product>(`${this.url}/${id}`, product)
      .subscribe(() => this.fetchProducts());
  }

  deleteProduct(id: number) {
    return this.httpService
      .deleteData(`${this.url}/${id}`)
      .subscribe(() => this.fetchProducts());
  }

  deleteProducts(ids: number[]) {
    return this.httpService
      .deleteData(`${this.url}/${ids}`)
      .subscribe(() => this.fetchProducts());
  }
}

const DUMMY_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'burger',
    unitPrice: 5,
    stockQuantity: 15
  },
  {
    id: 2,
    name: 'pizza',
    unitPrice: 4,
    stockQuantity: 10
  },
  {
    id: 3,
    name: 'chocolate',
    unitPrice: 2.5,
    stockQuantity: 50
  },
  {
    id: 4,
    name: 'tea',
    unitPrice: 3,
    stockQuantity: 10
  },
  {
    id: 5,
    name: 'cookie',
    unitPrice: 2,
    stockQuantity: 45
  },
  {
    id: 6,
    name: 'muffin',
    unitPrice: 4.5,
    stockQuantity: 35
  }
]