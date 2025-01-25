import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { RESTUser } from '../interfaces/rest-user.interface';
import { User } from '../interfaces/user.interface';
import { UserMapper } from '../mappers/user.mapper';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient)

  private apiUrl = environment.apiUrl + '/users';



  getUsers(): Observable<User[]> {
    return this.http.get<RESTUser[]>(this.apiUrl)
      .pipe(
        map((resp) => UserMapper.mapRestUserArrayToUserArray(resp))
      )
  }



}
