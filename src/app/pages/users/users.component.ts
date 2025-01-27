import { Component, inject, OnInit, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  public userService = inject(UsersService);

// Signals

  users = signal<User[]>([])

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        const usersArray = Array.isArray(data) ? data : [data];
        this.users.set(usersArray)
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