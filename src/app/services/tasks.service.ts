import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
