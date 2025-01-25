import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RESTUser } from '../interfaces/rest-user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient)

  private apiUrl = environment.apiUrl + '/users';



  getUsers(): Observable<RESTUser> {
    return this.http.get<RESTUser>(this.apiUrl)
  }


  
}
