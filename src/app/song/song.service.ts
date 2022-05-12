import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
// import { Apollo, gql } from 'apollo-angular';
@Injectable({
  providedIn: 'root',
})
export class SongService {
  SongList = [
    {
      id: 1,
      name: 'Biarkan Cinta Berlalu',
      genre: '1',
      duration: '1',
      createdBy: 'Nike Ardila',
    },
    {
      id: 2,
      name: 'anadai kau datang',
      genre: '1',
      duration: '1',
      createdBy: 'KoesPlus',
    },
    {
      id: 3,
      name: 'Kala Cinta Menggoda',
      genre: '1',
      duration: '1',
      createdBy: 'Chrisye',
    },
    {
      id: 4,
      name: 'Tenda Biru',
      genre: '1',
      duration: '1',
      createdBy: 'Desy Ratnasari',
    },
    {
      id: 5,
      name: 'Tenda Biru',
      genre: '1',
      duration: '1',
      createdBy: 'Desy Ratnasari',
    },
    {
      id: 6,
      name: 'Tenda Biru',
      genre: '1',
      duration: '1',
      createdBy: 'Desy Ratnasari',
    },
    {
      id: 7,
      name: 'Tenda Biru',
      genre: '1',
      duration: '1',
      createdBy: 'Desy Ratnasari',
    },
  ];
  constructor() {}
  directories: BehaviorSubject<any> = new BehaviorSubject<any[]>(this.SongList);
  getEditid(id: any) {
    console.log('id nya', id);
    const found = this.SongList.find((element: any) => element.id == id);
    console.log('found', found);
    return found;
  }
  tambahCard(data: any) {
    console.log('panjang data');
    data.id = this.SongList.length + 1;
    console.log('data di srvice', data);
    // this.SongList.push(data);
    // console.log('data di card sekarang', this.SongList);

    const tmp = this.directories.getValue();

    tmp.push(data);
    console.log('data tmp', tmp);
    this.directories.next(tmp);
  }
  // GetDataSong(): Observable<any> {
  //   return this.apollo.query({
  //     query: gql`
  //       query {
  //         getAllUser {
  //           name
  //         }
  //       }
  //     `,
  //     fetchPolicy: 'network-only',
  //   });
  // }
}
