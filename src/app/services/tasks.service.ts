import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { RESTTask } from '../interfaces/rest-task.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private http = inject(HttpClient)

  private apiUrl = environment.apiUrl + '/todos';



  getTasks(): Observable<RESTTask> {
    return this.http.get<RESTTask>(this.apiUrl)
  }

  getTasksByUserId(userId: string | number) {
    const url = `${this.apiUrl}?userId=${userId}`;
    return this.http.get<RESTTask[]>(url)

  }
}