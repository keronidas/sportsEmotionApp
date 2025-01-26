import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewComponent } from './task-view.component';
import { HttpClientModule } from '@angular/common/http';

describe('TaskViewComponent', () => {
  let component: TaskViewComponent;
  let fixture: ComponentFixture<TaskViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskViewComponent,HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be created with default values',()=>{
    console.log(component.id())
    expect(component.id()).toBe("")
  })
});
