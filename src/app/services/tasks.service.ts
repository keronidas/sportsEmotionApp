import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { TasksDto } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private http = inject(HttpClient)
  private apiUrl = environment.apiUrl + '/todos';


  getTasks(): Observable<TasksDto> {
    return this.http.get<TasksDto>(this.apiUrl)
  }

  getTasksById(userId: number): Observable<TasksDto> {
    const url = `${this.apiUrl}?userId=${userId}`;


    return this.http.get<TasksDto>(url).pipe(
      tap((response) => {
        // Aquí mostramos la respuesta del servidor
        console.log('Respuesta recibida en el servicio:', response);
      })
    );
  }
}