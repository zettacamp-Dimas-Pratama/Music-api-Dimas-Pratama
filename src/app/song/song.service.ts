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
            count_document
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
  FilterDataSong(filter: any): Observable<any> {
    console.log('pages', filter);

    return this.apollo.query({
      query: gql`
        query ($filter: InputSongFilter) {
          getAllSong(fillter: $filter) {
            name
            genre
            duration
            created_by {
              name
            }
          }
        }
      `,
      variables: {
        filter,
      },
      fetchPolicy: 'network-only',
    });
  }
  SortDataSongName(Sort: any): Observable<any> {
    console.log('pages', Sort);

    return this.apollo.query({
      query: gql`
        query  {
          getAllSong(sorting:{name:${Sort}}) {
            name
            genre
            duration
            created_by {
              name
            }
          }
        }
      `,

      fetchPolicy: 'network-only',
    });
  }
  SortDataSongGenre(Sort: any): Observable<any> {
    console.log('pages', Sort);

    return this.apollo.query({
      query: gql`
        query  {
          getAllSong(genre:{name:${Sort}}) {
            name
            genre
            duration
            created_by {
              name
            }
          }
        }
      `,

      fetchPolicy: 'network-only',
    });
  }
  SortDataSongCreated(Sort: any): Observable<any> {
    console.log('pages', Sort);

    return this.apollo.query({
      query: gql`
        query  {
          getAllSong(created_by:{name:${Sort}}) {
            name
            genre
            duration
            created_by {
              name
            }
          }
        }
      `,

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
    console.log('data payload', Payload);
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
        Payload,
      },
    });
  }
  UpdateSong(id: any, Payload: any): Observable<any> {
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
        Payload,
      },
    });
  }
}
