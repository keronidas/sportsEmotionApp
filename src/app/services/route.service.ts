import { Injectable } from '@angular/core';
import { RutasI } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor() { }
  routes: RutasI[] = [
    { url: '', name: 'menu', img:'home.png' },
    { url: '/users', name: 'usuarios', img: 'users.png' },
    { url: '/tasks', name: 'tareas', img:'tasks.png' },
  ]

  getRoutes() {
    return this.routes
  }
}
