import { Component, inject } from '@angular/core';
import { UsersDto } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  public userService = inject(UsersService);
  users: UsersDto[] = [];

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