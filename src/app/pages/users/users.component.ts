import { Component, inject } from '@angular/core';
import { RESTUser } from '../../interfaces/rest-user.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  public userService = inject(UsersService);
  users: RESTUser[] = [];

  ngAfterViewInit(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = Array.isArray(data) ? data : [data];
      },
      error: (err) => {
        console.error('Error al obtener los usuarios', err);
      },
      complete: () => {
        console.log('Petición completada');
      }
    });
  }
}