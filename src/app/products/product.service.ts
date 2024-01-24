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
    name: 'Burger',
    unitPrice: 5,
    stockQuantity: 15,
    imgPath: 'https://www.biofournil.com/wp-content/uploads/2021/02/BRIOCHE-BIOFOURNIL_web.jpg',
    description: 'It\'s a burguiir'
  },
  {
    id: 2,
    name: 'Pizza',
    unitPrice: 4,
    stockQuantity: 10,
    imgPath: 'https://fr.ooni.com/cdn/shop/articles/Margherita-9920.jpg?crop=center&height=800&v=1644590066&width=800',
    description: 'pazzapiz'
  },
  {
    id: 3,
    name: 'Chocolate',
    unitPrice: 2.5,
    stockQuantity: 50,
    imgPath: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Green_and_Black%27s_dark_chocolate_bar_2.jpg',
    description: 'chocolatinato batatinato'
  },
  {
    id: 4,
    name: 'Tea',
    unitPrice: 3,
    stockQuantity: 10,
    imgPath: 'https://www.foodandwine.com/thmb/6wTm7a0y87X97LK-ZMxe2787kI8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/different-types-of-tea-FT-BLOG0621-7c7fd231e66d4fea8ca9a47cad52ba79.jpg',
    description: 'chaaay bina3a3'
  },
  {
    id: 5,
    name: 'Cookie',
    unitPrice: 2,
    stockQuantity: 45,
    imgPath: 'https://sallysbakingaddiction.com/wp-content/uploads/2013/02/peanut-butter-chocolate-swirl-cookies-2.jpg',
    description: 'coooockizat'
  },
  {
    id: 6,
    name: 'Muffin',
    unitPrice: 4.5,
    stockQuantity: 35,
    imgPath: 'https://www.rainbownourishments.com/wp-content/uploads/2023/01/vegan-chocolate-chip-muffins-1..jpg',
    description: 'muffinnnnn'
  },
  {
    id: 7,
    name: 'Muffin',
    unitPrice: 4.5,
    stockQuantity: 35,
    imgPath: 'https://www.rainbownourishments.com/wp-content/uploads/2023/01/vegan-chocolate-chip-muffins-1..jpg',
    description: 'muffinnnnn'
  },
  {
    id: 8,
    name: 'Muffin',
    unitPrice: 4.5,
    stockQuantity: 35,
    imgPath: 'https://www.rainbownourishments.com/wp-content/uploads/2023/01/vegan-chocolate-chip-muffins-1..jpg',
    description: 'muffinnnnn'
  }
]