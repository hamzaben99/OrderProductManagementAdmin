import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;

  onLogout() {
    console.log("LoginOut...");
  }

  onNavigating() {
    this.sidenav.close();
  }

}
