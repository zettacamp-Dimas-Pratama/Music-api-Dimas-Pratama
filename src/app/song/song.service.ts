import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular';

export interface Page {
  limit: number;
  page: number;
}
export interface Filter {
  name: string;
  genre: string;
  creator_name: string;
}

export interface Sorting {
  name: any;
  genre: any;
  created_by: any;
}
export interface Song {
  name: string;
  _id: string;
  genre: string;
  duration: any;
}
@Injectable({
  providedIn: 'root',
})
export class SongService {
  constructor(private apollo: Apollo) {}

  GetDataSong2(page: Page, filter: Filter): Observable<any> {
    console.log('pages', page);
    return this.apollo.query({
      query: gql`
        query ($page: InputSongPage, $filter: InputSongFilter) {
          getAllSong(pagination: $page, fillter: $filter) {
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
          getAllSong(sorting:{genre:${Sort}}) {
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
          getAllSong(sorting:{created_by:${Sort}}) {
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
        mutation createSong($Payload: InputSong) {
          createSong(input_song: $Payload) {
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
        mutation updateSong($Payload: InputSong) {
          updateSong(id: "${id}",input_song: $Payload) {
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
