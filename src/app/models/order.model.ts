import { Client } from './client.model';
import { Product } from './product.model';

export class Order {
  constructor(
    public client: Client,
    public products: { productId: number, quantity: number, product?: Product }[],
    public orderDeliveryDate: Date,
    public orderDeliveryAddress?: string,
    public preorder?: boolean,
    public orderDate?: Date,
    public validated?: boolean,
    public id?: number
  ) {}
}
