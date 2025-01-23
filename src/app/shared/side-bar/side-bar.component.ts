import { Component, inject } from '@angular/core';
import { RutasI } from '../../interfaces/menu.interface';
import { RouteService } from '../../services/route.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'shared-side-bar',
  imports: [RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  public routeService = inject(RouteService)
  routes: RutasI[] = this.routeService.getRoutes()
}
