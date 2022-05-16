import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient, private apollo: Apollo) {}
  loginUser(email: string, password: string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: gql`
        mutation {
          loginUser(email: "${email}", hashed_password: "${password}") {
            token
          }
        }
      `,
      })
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }
  GetFakeAPI(): Observable<any> {
    return this.httpClient
      .get('https://jsonplaceholder.typicode.com/users')
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not load joke :-('))
      );
  }
}
