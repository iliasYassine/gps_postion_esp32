import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { USERS } from './chibani.model';

@Injectable({
  providedIn: 'root'
})
export class ChibaniService {

  private API_URL='http://192.168.1.200:8000/gps/users/';
  constructor(private httpClient:HttpClient) { }

  getUsersInfo():Observable<USERS[]>{
    return this.httpClient.get<USERS[]>(this.API_URL);
  }

  getUserById(id: number): Observable<USERS> {
    return this.httpClient.get<USERS>(`${this.API_URL}${id}/`);
  }

}
