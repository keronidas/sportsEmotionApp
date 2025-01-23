import { Routes } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';
import { UsersComponent } from './pages/users/users.component';
import { TasksComponent } from './pages/tasks/tasks.component';

export const routes: Routes = [
    { path: '', component: MenuComponent, pathMatch: 'full' },
    { path: 'users', component: UsersComponent },
    { path: 'tasks', component: TasksComponent },
    { path: '**', redirectTo: '' }

];
