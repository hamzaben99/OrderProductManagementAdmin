import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import {
  OrderEditComponent,
  OrderEditResult,
} from '../order-edit/order-edit.component';

@Component({
  selector: 'app-edit-dialog-entry',
  template: '',
})
export class EditDialogEntryComponent {
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
    const dialogRef = this.dialog.open(OrderEditComponent, {
      disableClose: true,
      data: {
        id: +this.route.snapshot.params['id'],
        isEditMode: this.route.snapshot.params['id'] != null,
      },
      /* write config here */
    });

    dialogRef.afterClosed().subscribe((result: OrderEditResult) => {
      if (result)
        this.router.navigate(result.navigate, { relativeTo: this.route });
      else this.router.navigate(['/orders']);
    });
  }
}
