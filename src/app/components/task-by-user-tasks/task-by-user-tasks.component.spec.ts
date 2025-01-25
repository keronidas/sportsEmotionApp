import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskByUserTasksComponent } from './task-by-user-tasks.component';

describe('TaskByUserTasksComponent', () => {
  let component: TaskByUserTasksComponent;
  let fixture: ComponentFixture<TaskByUserTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskByUserTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskByUserTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
