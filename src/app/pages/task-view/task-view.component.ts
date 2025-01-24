import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksDto } from '../../interfaces/task.interface';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {  // Cambié AfterViewInit a OnInit
  id!: string;
  tasks: WritableSignal<TasksDto[] | null> = signal(null); // Inicializamos con null

  private route = inject(ActivatedRoute);
  private taskService = inject(TasksService);

  ngOnInit(): void {  // Cambié ngAfterViewInit a ngOnInit
    // Obtener el parámetro 'id' desde la URL
    this.id = this.route.snapshot.paramMap.get('id') ?? '';

    // Si tenemos un ID, hacemos la solicitud
    if (this.id) {
      this.taskService.getTasksById(Number(this.id)).subscribe({
        next: (task) => {
          console.log('Tarea recibida:', task); // Verifica la tarea que se recibe
          this.tasks.set([task]); // Almacenamos la tarea obtenida
        },
        error: (err) => {
          console.error('Error al obtener la tarea:', err);
        }
      });
    }
  }
}
