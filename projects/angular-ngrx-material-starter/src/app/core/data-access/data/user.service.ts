import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //url: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public register(user: any): Promise<any> {
    return this.http
      .post('/api/user', user)
      .toPromise()
      .then(
        (el) => {
          console.log(el);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  public test() {
    return this.http.get('/api/test');
  }
}
