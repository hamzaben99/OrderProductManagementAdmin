export class Product {
  constructor(
    public name: string,
    public unitPrice: number,
    public stockQuantity: number,
    public description?: string,
    public imgPath?: string,
    public id?: number
  ) {}
}
