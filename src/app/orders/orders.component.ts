import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../products/product.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  displayMode = 'all';

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  onAddOrder() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onRefresh() {
    this.orderService.ordersChanged.next();
  }
}
