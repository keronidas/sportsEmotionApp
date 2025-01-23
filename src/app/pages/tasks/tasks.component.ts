import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { TasksDto } from '../../interfaces/task.interface';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tasks',
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  public taskService = inject(TasksService)
  tasks: TasksDto[] = [];
  displayedColumns: string[] = ['userId', 'id', 'title', 'completed'];
  dataSource!: MatTableDataSource<TasksDto>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngAfterViewInit(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = Array.isArray(data) ? data : [data];
        this.dataSource = new MatTableDataSource<TasksDto>(this.tasks);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
