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
  displayedColumns: string[] = ['userId', 'id', 'title', 'completed', 'button'];
  dataSource!: MatTableDataSource<TasksDto>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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
}
