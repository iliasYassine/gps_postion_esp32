import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GPS } from './gps.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostionGpsService {
  private API_URL='http://127.0.0.1:8000/gps/gps/';
  constructor(private httpClient:HttpClient) { }

  getGpsInfo():Observable<GPS[]>{
    return this.httpClient.get<GPS[]>(this.API_URL);
  }

  
}
