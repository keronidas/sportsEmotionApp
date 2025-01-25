import { Injectable } from '@angular/core';
import { RutasMenu } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor() { }
  routes: RutasMenu[] = [
    { url: '', name: 'menu', img:'home.png' },
    { url: '/users', name: 'users', img: 'users.png' },
    { url: '/tasks', name: 'tasks', img:'tasks.png' },
  ]

  getRoutes() {
    return this.routes
  }
}
