import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apollo: Apollo) {}

  loginUser(email: string, password: string): Observable<any> {
    console.log('tokenya', environment);
    const tmp = {
      email: email,
      hashed_password: password,
    };
    console.log('data login', tmp);
    return this.apollo
      .mutate({
        mutation: gql`
        mutation {
          loginUser(loginInput:{email: "${email}", hashed_password: "${password}"}) {
            value
          }
        }
      `,
      })
      .pipe(
        map((resp) => {
          console.log('resp', resp);
          this.userLogin(resp.data);
          return resp;
        })
      );
  }
  // loginUser(email: string, password: string): Observable<any> {
  //   const tmp = {
  //     email: email,
  //     hashed_password: password,
  //   };
  //   console.log('tmp nya', tmp);
  //   return this.apollo
  //     .mutate({
  //       mutation: gql`
  //         mutation Mutation($tmp: PromoInput) {
  //           loginUser(promo_input: $tmp) {
  //             token
  //           }
  //         }
  //       `,
  //     })
  //     .pipe(
  //       map((resp) => {
  //         console.log('resp', resp);
  //         this.userLogin(resp.data);
  //         return resp;
  //       })
  //     );
  // }

  userLogin(data: any) {
    localStorage.setItem(
      environment.tokenKey,
      // JSON.stringify(data.loginUser.value)
      JSON.stringify(`bearer ${data.loginUser.value}`)
    );
    console.log('datalocal token', localStorage);
  }

  // logOut() {
  //   localStorage.removeItem(environment.tokenKey);
  // }
}
