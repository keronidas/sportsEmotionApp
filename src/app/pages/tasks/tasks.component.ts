import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { RESTTask as Task } from '../../interfaces/rest-task.interface';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ChartModule } from 'primeng/chart';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-tasks',
  imports: [MatTableModule, MatPaginatorModule, ChartModule, MatSortModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private taskService = inject(TasksService);

  dataChartJs: any;
  sortedData!: Task[];
  options: any;
  completed: number = 0;
  notCompleted: number = 0;
  tasks = signal<Task[]>([])

  displayedColumns: string[] = ['userId', 'id', 'title', 'completed', 'button'];
  dataSource!: MatTableDataSource<Task>;


  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        const tasksArray = Array.isArray(data) ? data : [data];
        this.tasks.set(tasksArray);

        // Configurar la tabla de datos
        this.dataSource = new MatTableDataSource<Task>(tasksArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // Calcular tareas completadas y no completadas
        this.completed = tasksArray.filter((task) => task.completed).length;
        this.notCompleted = tasksArray.length - this.completed;

        // Actualizar gráfico
        this.updateChart();
      },
      error: (err) => {
        console.error('Error al obtener las tareas:', err);
      },
      complete: () => {
        console.log('Petición completada');
        console.log('Tareas completadas:', this.completed);
        console.log('Tareas no completadas:', this.notCompleted);
      }
    });
  }

  sortData(sort: Sort) {
    const data = [...this.tasks()];
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'userId':
          return compare(a.userId, b.userId, isAsc);
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'completed':
          return compare(a.completed, b.completed, isAsc);
        default:
          return 0;
      }
    });
  }


  updateChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.dataChartJs = {
      labels: ['Not Completed', 'Completed',],
      datasets: [
        {
          data: [this.notCompleted, this.completed],
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
  changeStatusTask(taskId: number) {
    const task = this.tasks().find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.tasks.set([...this.tasks()]);
      // Calcular tareas completadas y no completadas
      this.completed = this.tasks().filter((task) => task.completed).length;
      this.notCompleted = this.tasks().length - this.completed;

      // Actualizar gráfico
      this.updateChart();
    }
  }

}



function compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean): number {
  if (typeof a === 'boolean' && typeof b === 'boolean') {
    return (a === b ? 0 : a ? -1 : 1) * (isAsc ? 1 : -1);
  }
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}