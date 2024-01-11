import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Order } from '../../models/order.model';
import { OrderService } from '../order.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACK_BAR_DURATION } from '../../shared/constants';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css'],
})
export class OrdersTableComponent
  implements AfterViewInit, OnInit, OnChanges, OnDestroy
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<OrdersTableItem>;
  dataSource = new MatTableDataSource<OrdersTableItem>([]);
  data: Order[] = [];
  @Input('mode') displayMode: string;
  private subscription: Subscription;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'id',
    'client',
    'orderDate',
    'orderDeliveryDate',
    'totalQuantity',
    'pre-order',
    'status',
    'actions',
  ];

  constructor(
    private snackBar: MatSnackBar,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.orderService.ordersChanged.subscribe(() => {
      this.loadData();
    });
    this.orderService.ordersChanged.next();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = this.mapOrdersToTableItems(
      this.filterOnDisplayMode(this.data)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  validateOrder(id: number) {
    this.orderService.validateOrder(id).subscribe({
      next: () =>
        this.snackBar.open(
          `Order No. ${id} has been validated successfully`,
          'dismiss',
          {
            duration: SNACK_BAR_DURATION,
            panelClass: 'successful',
          }
        ),
      error: (err) =>
        this.snackBar.open(
          `Failed to validate order No. ${id}: ${err.message}`,
          'dismiss',
          {
            duration: SNACK_BAR_DURATION,
            panelClass: 'fail',
          }
        ),
    });
  }

  onOrderDetails(id: number) {
    this.router.navigate([id], { relativeTo: this.route });
  }

  onOrderEdit(id: number) {
    this.router.navigate([id, 'edit'], { relativeTo: this.route });
  }

  onOrderDelete(id: number) {
    const response = window.confirm(
      'are you sure you want to delete this order ?'
    );
    if (response) {
      this.orderService.deleteOrder(id).subscribe({
        next: () =>
          this.snackBar.open(
            `Order No. ${id} has been deleted successfully`,
            'dismiss',
            {
              duration: SNACK_BAR_DURATION,
              panelClass: 'successful',
            }
          ),
        error: (err) =>
          this.snackBar.open(
            `Failed to delete order No. ${id}: ${err.message}`,
            'dismiss',
            {
              duration: SNACK_BAR_DURATION,
              panelClass: 'fail',
            }
          ),
      });
    }
  }

  private filterOnDisplayMode(orders: Order[]) {
    return orders.filter((order: Order) => {
      switch (this.displayMode) {
        case 'preorder':
          return order.preorder;
        case 'normal':
          return !order.preorder;
        default:
          return true;
      }
    });
  }

  private loadData() {
    this.orderService.fetchOrders().subscribe({
      next: (orders: Order[]) => {
        this.data = orders;
        this.dataSource.data = this.mapOrdersToTableItems(this.data);
      },
      error: (err) => {
        this.snackBar.open(
          `Failed to fetch orders: ${err.message}`,
          'dismiss',
          {
            duration: SNACK_BAR_DURATION,
            panelClass: 'fail',
          }
        );
      },
    });
  }

  private mapOrdersToTableItems(orders: Order[]) {
    return orders.map(
      (order: Order) =>
        new OrdersTableItem(
          order.id,
          order.client.lastName,
          order.orderDate,
          order.orderDeliveryDate,
          order.products
            .map((product) => product.quantity)
            .reduce((prev, curr) => prev + curr),
          order.preorder,
          order.validated
        )
    );
  }
}

export class OrdersTableItem {
  constructor(
    public id: number,
    public client: string,
    public orderDate: Date,
    public orderDeliveryDate: Date,
    public totalQuantity: number,
    public preOrder: boolean,
    public validated: boolean
  ) {}
}
