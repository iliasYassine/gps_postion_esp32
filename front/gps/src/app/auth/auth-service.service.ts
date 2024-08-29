import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private loginUrl="http://192.168.1.200:8000/gps/login/";
  private logoutUrl="http://192.168.1.200:8000/gps/logout/";
  private _isAuthenticated = false;

  constructor(private http:HttpClient) { }

  
   // Connexion
   login(username: string, password: string): Observable<any> {
    const body = { username: username, password: password };
    this._isAuthenticated = true;
    return this.http.post(this.loginUrl, body); // Assurez-vous que le Content-Type est défini sur 'application/json' si nécessaire
}

  // Déconnexion
  logout(): Observable<any> {
    this._isAuthenticated = false;
    // L'API Django peut nécessiter une configuration supplémentaire pour gérer correctement la déconnexion via une API
    return this.http.post(this.logoutUrl, {});
  }

  isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  
}
