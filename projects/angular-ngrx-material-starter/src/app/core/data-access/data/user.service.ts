import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  public test(): Promise<any> {
    const optionRequete = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'mon-entete-personnalise': 'maValeur'
      })
    };

    return this.http
      .get('/api', optionRequete)
      .toPromise()
      .then(
        (el) => {
          return Promise.resolve(el);
        },
        (err) => {
          return Promise.reject(err);
        }
      );
  }

  public register(user: any): Promise<any> {
    return this.http
      .post<any>('/api/user', user)
      .toPromise()
      .then(
        (el) => {
          return Promise.resolve(el);
        },
        (err) => {
          return Promise.reject(err);
        }
      );
  }

  public login(user: any): Promise<any> {
    return this.http
      .post<any>('/api/login', user)
      .toPromise()
      .then(
        (token) => {
          return Promise.resolve(token);
        },
        (err) => {
          return Promise.reject(err);
        }
      );
  }
}
