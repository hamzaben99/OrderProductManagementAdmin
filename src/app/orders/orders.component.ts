import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  displayMode = 'all';

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onAddOrder() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onRefresh() {
    this.orderService.ordersChanged.next();
  }
}
