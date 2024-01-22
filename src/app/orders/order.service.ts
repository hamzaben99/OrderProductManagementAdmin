import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Subject, delay, of, tap } from 'rxjs';
import { HttpService } from '../shared/http.service';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  ordersChanged = new Subject<void>();
  private url = 'api/orders';

  constructor(
    private httpService: HttpService,
  ) {}

  fetchOrders() {
    return of(DUMMY_ORDERS).pipe(delay(200)); //todo: to be removed
    return this.httpService.getData<Order[]>(this.url);
  }

  fetchOrderById(id: number) {
    return of(DUMMY_ORDERS.find((order) => order.id === id)).pipe(delay(200)); // todo: to be removed
    return this.httpService.getData<Order>(`${this.url}/${id}`);
  }

  addOrder(order: Order, isPreorder: boolean) {
    return this.httpService
      .postData<Order>(this.url, order, { preorder: isPreorder })
      .pipe(tap(() => this.ordersChanged.next()));
  }

  updateOrder(id: number, newOrder: Order) {
    return this.httpService
      .putData<Order>(`${this.url}/${id}`, newOrder)
      .pipe(tap(() => this.ordersChanged.next()));
  }

  validateOrder(id: number) {
    return this.httpService
      .putData(`${this.url}/${id}/validate`, null)
      .pipe(tap(() => this.ordersChanged.next()));
    // DUMMY_ORDERS.forEach(order => {
    //   if (order.id === id)
    //     order.validated = true;
    // })
    // this.ordersChanged.next();
  }

  validateOrders(ids: number[]) {
    return this.httpService
      .putData(`${this.url}/${ids}/validate-all`, null)
      .pipe(tap(() => this.ordersChanged.next()));
    // DUMMY_ORDERS.forEach(order => {
    //   if (ids.includes(order.id))
    //     order.validated = true;
    // })
    // this.ordersChanged.next();
  }

  deleteOrder(id: number) {
    return this.httpService
      .deleteData(`${this.url}/${id}`)
      .pipe(tap(() => this.ordersChanged.next()));
    // const index = DUMMY_ORDERS.findIndex((order) => order.id === id);
    // DUMMY_ORDERS.splice(index, 1);
    // this.ordersChanged.next()
  }

  getOrderWithProducts(order: Order, products: Product[]) {
    order.products = order.products.map((p) => ({
      productId: p.productId,
      quantity: p.quantity,
      product: products.find((pr) => pr.id === p.productId),
    }));
    return order;
  }
}

const DUMMY_ORDERS: Order[] = [
  {
    id: 1,
    client: {
      firstName: 'hamza',
      lastName: 'benmendil',
      phoneNumber: '0659498105',
      emailAddress: 'lolodemo@live.fr',
    },
    orderDate: new Date(),
    orderDeliveryDate: new Date(),
    products: [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: 4 },
      { productId: 3, quantity: 4 },
      { productId: 4, quantity: 4 },
      { productId: 5, quantity: 4 },
      { productId: 6, quantity: 4 },
    ],
    validated: true,
    preorder: true,
  },
  {
    id: 2,
    client: {
      firstName: 'hamza',
      lastName: 'benmendil',
      phoneNumber: '0659498105',
      emailAddress: 'lolodemo@live.fr',
    },
    orderDate: new Date(),
    orderDeliveryDate: new Date(),
    products: [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: 4 },
    ],
    validated: true,
    preorder: true,
  },
  {
    id: 3,
    client: {
      firstName: 'hamza',
      lastName: 'benmendil',
      phoneNumber: '0659498105',
      emailAddress: 'lolodemo@live.fr',
    },
    orderDate: new Date(),
    orderDeliveryDate: new Date(),
    products: [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: 4 },
    ],
    validated: false,
    preorder: false,
  },
  {
    id: 4,
    client: {
      firstName: 'hamza',
      lastName: 'benmendil',
      phoneNumber: '0659498105',
      emailAddress: 'lolodemo@live.fr',
    },
    orderDate: new Date(),
    orderDeliveryDate: new Date(),
    products: [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: 4 },
    ],
    validated: true,
    preorder: true,
  },
  {
    id: 5,
    client: {
      firstName: 'hamza',
      lastName: 'benmendil',
      phoneNumber: '0659498105',
      emailAddress: 'lolodemo@live.fr',
    },
    orderDate: new Date(),
    orderDeliveryDate: new Date(),
    products: [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: 4 },
    ],
    validated: true,
    preorder: false,
  },
  {
    id: 6,
    client: {
      firstName: 'hamza',
      lastName: 'benmendil',
      phoneNumber: '0659498105',
      emailAddress: 'lolodemo@live.fr',
    },
    orderDate: new Date(),
    orderDeliveryDate: new Date(),
    products: [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: 4 },
    ],
    validated: true,
    preorder: false,
  },
  {
    id: 7,
    client: {
      firstName: 'hamza',
      lastName: 'benmendil',
      phoneNumber: '0659498105',
      emailAddress: 'lolodemo@live.fr',
    },
    orderDate: new Date(),
    orderDeliveryDate: new Date(),
    products: [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: 4 },
    ],
    validated: true,
    preorder: true,
  },
  {
    id: 8,
    client: {
      firstName: 'hamza',
      lastName: 'benmendil',
      phoneNumber: '0659498105',
      emailAddress: 'lolodemo@live.fr',
    },
    orderDate: new Date(),
    orderDeliveryDate: new Date(),
    products: [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: 4 },
    ],
    validated: true,
    preorder: false,
  },
  {
    id: 9,
    client: {
      firstName: 'hamza',
      lastName: 'benmendil',
      phoneNumber: '0659498105',
      emailAddress: 'lolodemo@live.fr',
    },
    orderDate: new Date(),
    orderDeliveryDate: new Date(),
    products: [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: 4 },
    ],
    validated: false,
    preorder: true,
  },
  {
    id: 10,
    client: {
      firstName: 'hamza',
      lastName: 'benmendil',
      phoneNumber: '0659498105',
      emailAddress: 'lolodemo@live.fr',
    },
    orderDate: new Date(),
    orderDeliveryDate: new Date(),
    products: [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: 4 },
    ],
    validated: true,
    preorder: false,
  },
  {
    id: 11,
    client: {
      firstName: 'hamza',
      lastName: 'benmendil',
      phoneNumber: '0659498105',
      emailAddress: 'lolodemo@live.fr',
    },
    orderDate: new Date(),
    orderDeliveryDate: new Date(),
    products: [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: 4 },
    ],
    validated: true,
    preorder: true,
  },
  {
    id: 12,
    client: {
      firstName: 'hamza',
      lastName: 'benmendil',
      phoneNumber: '0659498105',
      emailAddress: 'lolodemo@live.fr',
    },
    orderDate: new Date(),
    orderDeliveryDate: new Date(),
    products: [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: 4 },
    ],
    validated: false,
    preorder: false,
  },
  {
    id: 13,
    client: {
      firstName: 'hamza',
      lastName: 'benmendil',
      phoneNumber: '0659498105',
      emailAddress: 'lolodemo@live.fr',
    },
    orderDate: new Date(),
    orderDeliveryDate: new Date(),
    products: [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: 4 },
    ],
    validated: true,
    preorder: true,
  },
  {
    id: 14,
    client: {
      firstName: 'hamza',
      lastName: 'benmendil',
      phoneNumber: '0659498105',
      emailAddress: 'lolodemo@live.fr',
    },
    orderDate: new Date(),
    orderDeliveryDate: new Date(),
    products: [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: 4 },
    ],
    validated: true,
    preorder: true,
  },
  {
    id: 15,
    client: {
      firstName: 'hamza',
      lastName: 'benmendil',
      phoneNumber: '0659498105',
      emailAddress: 'lolodemo@live.fr',
    },
    orderDate: new Date(),
    orderDeliveryDate: new Date(),
    products: [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: 4 },
    ],
    validated: false,
    preorder: true,
  },
  {
    id: 16,
    client: {
      firstName: 'hamza',
      lastName: 'benmendil',
      phoneNumber: '0659498105',
      emailAddress: 'lolodemo@live.fr',
    },
    orderDate: new Date(),
    orderDeliveryDate: new Date(),
    products: [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: 4 },
    ],
    validated: false,
    preorder: true,
  },
  {
    id: 17,
    client: {
      firstName: 'hamza',
      lastName: 'benmendil',
      phoneNumber: '0659498105',
      emailAddress: 'lolodemo@live.fr',
    },
    orderDate: new Date(),
    orderDeliveryDate: new Date(),
    products: [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: 4 },
    ],
    validated: false,
    preorder: false,
  },
  {
    id: 18,
    client: {
      firstName: 'hamza',
      lastName: 'benmendil',
      phoneNumber: '0659498105',
      emailAddress: 'lolodemo@live.fr',
    },
    orderDate: new Date(),
    orderDeliveryDate: new Date(),
    products: [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: 4 },
    ],
    validated: false,
    preorder: true,
  },
  {
    id: 19,
    client: {
      firstName: 'hamza',
      lastName: 'benmendil',
      phoneNumber: '0659498105',
      emailAddress: 'lolodemo@live.fr',
    },
    orderDate: new Date(),
    orderDeliveryDate: new Date(),
    products: [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: 4 },
    ],
    validated: false,
    preorder: true,
  },
  {
    id: 20,
    client: {
      firstName: 'hamza',
      lastName: 'benmendil',
      phoneNumber: '0659498105',
      emailAddress: 'lolodemo@live.fr',
    },
    orderDate: new Date(),
    orderDeliveryDate: new Date(),
    products: [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: 4 },
    ],
    validated: true,
    preorder: true,
  },
];
