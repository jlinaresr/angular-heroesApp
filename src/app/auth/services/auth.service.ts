import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ... this._auth! }
  }
  constructor(private http: HttpClient) { }

  // una manera sin obligar los observables
  verificaAutenticacion1(): Observable<boolean> | boolean {
    if( !localStorage.getItem('token') ){
      return false;
    }
    return true;
  }

  verificaAutenticacion(): Observable<boolean>{
    if( !localStorage.getItem('token') ){
      return of(false);
    }
    return this.http.get<Auth>(`${this.baseURL}/usuarios/1`)
              .pipe(
                map( auth => {
                  this._auth = auth;
                  console.log('map', map);
                  return true;
                })
              )
  }

  login() : Observable<Auth> {
    return this.http.get<Auth>(`${this.baseURL}/usuarios/1`)
      .pipe(
        tap( resp => this._auth = resp ),
        tap( auth => localStorage.setItem( 'token', auth.id ))
      );
  }

  logout() {
    this._auth = undefined;
    //localStorage.removeItem('token');
  }

}
