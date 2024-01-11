import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  OrderDetailsComponent,
  OrderDetailsResult,
} from '../order-details/order-details.component';

@Component({
  selector: 'app-details-dialog-entry',
  template: '',
})
export class DetailsDialogEntryComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // open Dialog here
    this.openDialog();
  }

  private openDialog() {
    const dialogRef = this.dialog.open(OrderDetailsComponent, {
      data: { id: +this.route.snapshot.params['id'] },
      /* write config here */
    });

    dialogRef.afterClosed().subscribe((result: OrderDetailsResult) => {
      if (result)
        this.router.navigate(result.navigate, { relativeTo: this.route });
      else this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
