import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-view',
  imports: [],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.scss'
})
export class TaskViewComponent implements OnInit {
  id!: string;
  private route = inject(ActivatedRoute)
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
  }
}
