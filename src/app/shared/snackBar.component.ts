import { Component, Inject } from "@angular/core";
import { MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";

@Component({
    selector: 'app-snack-bar',
    template: `
    <span>{{ data.message }}</span>
    <button mat-button matSnackBarAction>{{ data.action }}</button>`
})
export class SnackBarComponent {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: {message: string, action: string}) {}
}