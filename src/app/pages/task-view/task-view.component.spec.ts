import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskViewComponent } from './task-view.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskViewComponent', () => {
  let component: TaskViewComponent;
  let fixture: ComponentFixture<TaskViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TaskViewComponent,
        HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule, // Módulo de animaciones
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('signal Id should be created with default values', () => {
    expect(component.id()).toBe('');
  });
  it('signal tasks should be created with default values', () => {
    console.log(component.tasks());
    expect(component.tasks()).toEqual([]);
  });
  it('signal user should be created with default values', () => {
    console.log(component.user());
    expect(component.user()).toEqual({
      userId: '',
      name: '',
      username: '',
      email: '',
      phone: ''
    });
  });

});
