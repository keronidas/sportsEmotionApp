import { Component, input } from '@angular/core';
import { RESTTask } from '../../interfaces/rest-task.interface';

@Component({
  selector: 'tasks-by-user-list',
  imports: [],
  templateUrl: './task-by-user-tasks.component.html',
  styleUrl: './task-by-user-tasks.component.scss'
})
export class TaskByUserTasksComponent {

  tasks = input.required<RESTTask[]>()


}
