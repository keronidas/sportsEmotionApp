import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { RESTTask } from '../interfaces/rest-task.interface';
import { Task } from '../interfaces/task.interface';
import { TaskMapper } from '../mappers/task.mapper';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private http = inject(HttpClient)

  private apiUrl = environment.apiUrl + '/todos';



  getTasks(): Observable<Task[]> {
    return this.http.get<RESTTask[]>(this.apiUrl)
      .pipe(
        map((resp) => TaskMapper.mapRestTaskArrayToTaskArray(resp))
      )
  }

  getTasksByUserId(userId: string | number): Observable<Task[]> {
    const url = `${this.apiUrl}?userId=${userId}`;
    return this.http.get<RESTTask[]>(url)
      .pipe(
        map((resp) => TaskMapper.mapRestTaskArrayToTaskArray(resp))
      )

  }
}