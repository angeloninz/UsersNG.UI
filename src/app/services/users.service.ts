import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserResponse } from '../shared/user.response';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.baseApiUrl + '/api/users');
  }

  addUser(addUserRequest: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(
      this.baseApiUrl + '/api/users',
      addUserRequest
    );
  }

  getUser(id: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.baseApiUrl + '/api/users/' + id);
  }

  updateUser(id: number, updateUserRequest: User): Observable<UserResponse> {
    return this.http.put<UserResponse>(
      this.baseApiUrl + '/api/users/' + id,
      updateUserRequest
    );
  }

  deleteUser(id: number): Observable<UserResponse> {
    return this.http.delete<UserResponse>(this.baseApiUrl + '/api/users/' + id);
  }
}
