import { Component, inject } from '@angular/core';
import { RutasMenu } from '../../interfaces/menu.interface';
import { RouteService } from '../../services/route.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  public routeService = inject(RouteService)
  routes: RutasMenu[] = this.routeService.getRoutes()
}
