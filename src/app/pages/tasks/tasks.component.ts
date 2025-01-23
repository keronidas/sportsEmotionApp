import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { TasksDto } from '../../interfaces/task.interface';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ChartModule } from 'primeng/chart';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tasks',
  imports: [MatTableModule, MatPaginatorModule, ChartModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements AfterViewInit {
  dataChartJs: any;
  options: any;
  completed: number = 0;
  notCompleted: number = 0;
  public taskService = inject(TasksService);
  tasks: TasksDto[] = [];
  displayedColumns: string[] = ['userId', 'id', 'title', 'completed'];
  dataSource!: MatTableDataSource<TasksDto>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    // Mover la suscripción aquí para acceder a tasks después de que se carguen
    this.taskService.getTasks().subscribe({
      next: (data) => {
        // Asegúrate de que data sea un arreglo de tareas
        this.tasks = Array.isArray(data) ? data : [data];
        this.dataSource = new MatTableDataSource<TasksDto>(this.tasks);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // Contar las tareas completadas y no completadas después de cargar los datos
        this.completed = 0;
        this.notCompleted = 0;
        this.tasks.forEach((element) => {
          if (element.completed) {
            this.completed++;
          } else {
            this.notCompleted++;
          }
        });

        // Actualizar el gráfico después de contar las tareas
        this.updateChart();
      },
      error: (err) => {
        console.error('Error al obtener las tareas', err);
      },
      complete: () => {
        console.log('Petición completada');
        console.log('Tareas completadas:', this.completed);
        console.log('Tareas no completadas:', this.notCompleted);
      }
    });
  }

  // Función para actualizar los datos del gráfico
  updateChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.dataChartJs = {
      labels: ['Completed', 'Not Completed'],
      datasets: [
        {
          data: [this.completed, this.notCompleted],
          backgroundColor: [
            'rgb(105, 202, 96)',
            'rgb(12, 113, 134)'
          ],
          hoverOffset: 4
        }
      ]
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
  }
}
