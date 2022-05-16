import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular';

export interface Page {
  limit: number;
  page: number;
}
export interface FilterName {
  name: string;
}
export interface Song {
  name: string;
  _id: string;
  genre: string;
  duration: any;
  created_by: any;
}
@Injectable({
  providedIn: 'root',
})
export class SongService {
  constructor(private apollo: Apollo) {}

  GetDataSong2(page: Page): Observable<any> {
    console.log('pages', page);
    return this.apollo.query({
      query: gql`
        query ($page: InputSongPage) {
          getAllSong(pagination: $page) {
            name
            _id
            genre
            duration
            created_by {
              name
              email
              _id
              user_type
            }
          }
        }
      `,
      variables: {
        page,
      },
      fetchPolicy: 'network-only',
    });
  }
  FilterDataSongName(filter: FilterName): Observable<any> {
    console.log('pages', filter);
    return this.apollo.query({
      query: gql`
        query ($filter: InputSongFilter) {
          getAllSong(fillter: $filter) {
            name
          }
        }
      `,
      variables: {
        filter,
      },
      fetchPolicy: 'network-only',
    });
  }
  GetDataSongid(id: any): Observable<any> {
    console.log('dataid', id);
    return this.apollo.query({
      query: gql`
        query {
          getSongById (id: "${id}"){
            name
            genre
            duration
          }
        }
      `,
      fetchPolicy: 'network-only',
    });
  }
  DeleteDataSongid(id: any): Observable<any> {
    console.log('dataid', id);
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          removeSong (id: "${id}") {
            name
            genre
            duration
          }
        }
      `,
      fetchPolicy: 'network-only',
    });
  }
  CreateSong(Payload: any): Observable<any> {
    const payload = {
      name: Payload.name,

      genre: Payload.genre,
      duration: parseInt(Payload.duration),
    };
    console.log('data payload', payload);
    return this.apollo.mutate({
      mutation: gql`
        mutation createSong($payload: InputSong) {
          createSong(input_song: $payload) {
            name
            genre
            duration
          }
        }
      `,
      variables: {
        payload,
      },
    });
  }
  UpdateSong(id: any, Payload: any): Observable<any> {
    const payload = {
      name: Payload.name,

      genre: Payload.genre,
      duration: parseInt(Payload.duration),
    };
    console.log('data payload', payload);
    console.log('data id siallan2', id);
    return this.apollo.mutate({
      mutation: gql`
        mutation updateSong($payload: InputSong) {
          updateSong(id: "${id}",input_song: $payload) {
            name
            genre
            duration
          }
        }
      `,
      variables: {
        payload,
      },
    });
  }
}
