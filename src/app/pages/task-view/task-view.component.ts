import { Component, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../interfaces/task.interface';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user.interface';
import { forkJoin } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ChartModule } from 'primeng/chart';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
  imports: [MatProgressSpinnerModule, MatTableModule, MatPaginatorModule, ChartModule, MatSortModule]
})
export class TaskViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private route = inject(ActivatedRoute);
  private taskService = inject(TasksService);
  private userService = inject(UsersService);

  dataChartJs: any;
  sortedData!: Task[];
  options: any;
  completed: number = 0;
  notCompleted: number = 0;

  id = signal<string | number>("")
  tasks = signal<Task[]>([])
  user = signal<User>({
    userId: '',
    name: '',
    username: '',
    email: '',
    phone: ''
  })

  displayedColumns: string[] = ['title', 'completed', 'button'];
  dataSource!: MatTableDataSource<Task>;



  ngOnInit(): void {
    this.id.set(this.route.snapshot.paramMap.get('id') ?? '');



    forkJoin({
      user: this.userService.getUserById(this.id()),
      tasks: this.taskService.getTasksByUserId(this.id())
    }).subscribe(
      ({ user, tasks }) => {
        this.user.set(user);
        this.tasks.set(tasks);
        // Configurar la tabla de datos
        this.dataSource = new MatTableDataSource<Task>(this.tasks())
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // Calcular tareas completadas y no completadas
        this.completed = tasks.filter((task) => task.completed).length;
        this.notCompleted = tasks.length - this.completed;

        // Actualizar gráfico
        this.updateChart();
      },
      (error) => {
        console.error('Error al obtener datos', error);

      },
      () => {
        console.log("Proceso terminado")
      }
    );
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


}

function compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean): number {
  if (typeof a === 'boolean' && typeof b === 'boolean') {
    return (a === b ? 0 : a ? -1 : 1) * (isAsc ? 1 : -1);
  }
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}