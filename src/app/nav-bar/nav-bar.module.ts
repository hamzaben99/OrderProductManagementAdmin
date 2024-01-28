import { NavBarComponent } from "./nav-bar.component";

import { NgModule } from "@angular/core";
import { MatDividerModule } from "@angular/material/divider";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        NavBarComponent,
    ],
    imports: [
        RouterModule,
        SharedModule,
        MatSidenavModule,
        MatDividerModule
    ],
    exports: [
        NavBarComponent
    ]
})
export class NavBarModule {

}