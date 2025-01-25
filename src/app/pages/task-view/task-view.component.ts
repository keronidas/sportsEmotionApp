import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { TaskByUserTasksComponent } from "../../components/task-by-user-tasks/task-by-user-tasks.component";
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
  imports: [TaskByUserTasksComponent]
})
export class TaskViewComponent implements OnInit {
  id = signal<string>("")

  private route = inject(ActivatedRoute);
  private taskService = inject(TasksService);

  ngOnInit(): void {
    this.id.set(this.route.snapshot.paramMap.get('id') ?? '');
  }

  isLoading = signal(false)
  isError = signal<string | null>(null)
  tasks = signal<Task[]>([])

  onSearch() {
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.isError.set(null);

    this.taskService.getTasksByUserId(this.id())
      .subscribe((tasks) => {
        this.isLoading.set(false)
        this.tasks.set(tasks);
      })

  }
}
