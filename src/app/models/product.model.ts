export class Product {
  constructor(
    public name: string,
    public unitPrice: number,
    public stockQuantity: number,
    public description?: string,
    public productImages?: {paths?: string[], files?: File[]},
    public id?: number
  ) {}
}
