import { Injectable } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { Product } from '../models/product.model';
import { Subject, delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productsChanged = new Subject<void>();
  private url = 'api/products';

  constructor(private httpService: HttpService) {}

  fetchProducts() {
    return of(DUMMY_PRODUCTS).pipe(delay(200));
    return this.httpService.getData<Product[]>(this.url);
  }

  fetchProductById(id: number) {
    return of(DUMMY_PRODUCTS.find(product => product.id === id)).pipe(delay(200));
    return this.httpService.getData<Product>(`${this.url}/${id}`);
  }

  addProduct(product: Product) {
    return this.httpService
      .postData<Product>(this.url, product)
      .pipe(tap(() => this.productsChanged.next()));
  }

  updateProduct(id: number, product: Product) {
    return this.httpService
      .putData<Product>(`${this.url}/${id}`, product)
      .pipe(tap(() => this.productsChanged.next()));
  }

  deleteProduct(id: number) {
    return this.httpService
      .deleteData(`${this.url}/${id}`)
      .pipe(tap(() => this.productsChanged.next()));
  }

  deleteProducts(ids: number[]) {
    return this.httpService
      .deleteData(`${this.url}/${ids}`)
      .pipe(tap(() => this.productsChanged.next()));
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