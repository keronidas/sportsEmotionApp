import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'back-button',
  imports: [],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss'
})
export class BackButtonComponent {

  private location = inject(Location)

  goBack(): void {
    this.location.back();
  }
}
