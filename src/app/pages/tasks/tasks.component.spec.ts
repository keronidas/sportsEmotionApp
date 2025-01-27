

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { TasksComponent } from "./tasks.component";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TasksComponent,
        HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule, // Módulo de animaciones
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('signal tasks should be created with default values', () => {
    console.log(component.tasks());
    expect(component.tasks()).toEqual([]);

  })
})