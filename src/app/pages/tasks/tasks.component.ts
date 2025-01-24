import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { TasksDto } from '../../interfaces/task.interface';
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
export class TasksComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  dataChartJs: any;
  sortedData!: TasksDto[];
  options: any;
  completed: number = 0;
  notCompleted: number = 0;
  tasks: TasksDto[] = [];
  displayedColumns: string[] = ['userId', 'id', 'title', 'completed', 'button'];
  dataSource!: MatTableDataSource<TasksDto>;

  public taskService = inject(TasksService);

  ngAfterViewInit(): void {

    this.taskService.getTasks().subscribe({
      next: (data) => {

        this.tasks = Array.isArray(data) ? data : [data];
        this.dataSource = new MatTableDataSource<TasksDto>(this.tasks);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;


        this.completed = 0;
        this.notCompleted = 0;
        this.tasks.forEach((element) => {
          if (element.completed) {
            this.completed++;
          } else {
            this.notCompleted++;
          }
        });


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
  sortData(sort: Sort) {
    const data = this.tasks.slice();
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
}

function compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean): number {
  if (typeof a === 'boolean' && typeof b === 'boolean') {
    return (a === b ? 0 : a ? -1 : 1) * (isAsc ? 1 : -1);
  }
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}