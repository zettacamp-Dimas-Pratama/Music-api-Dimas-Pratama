import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SongService, Song } from '../song.service';
import { MatDialog } from '@angular/material/dialog';
import { AddSongDialogComponent } from '../add-song-dialog/add-song-dialog.component';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { startWith, tap } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-song-table-lists',
  templateUrl: './song-table-lists.component.html',
  styleUrls: ['./song-table-lists.component.scss'],
})
export class SongTableListsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dataCount = 0;
  filterName: any;
  FakeData: any;
  DataSong: any;
  dataSource = new MatTableDataSource<any>([]);
  pageSizeOptions: number[] = [2, 5, 10, 25, 50, 100];
  title2: any;
  private subs = new SubSink();

  // Table
  displayedColumns: string[] = [
    'name',
    'genre',
    'duration',
    'created',
    'action',
  ];
  filterColumns: string[] = [
    'nameFilter',
    'genreFilter',
    'durationFilter',
    'createdFilter',
  ];
  constructor(
    private songService: SongService,
    public dialog: MatDialog,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer
  ) {}
  ngAfterViewInit(): void {
    this.subs.sink = this.paginator.page
      .pipe(
        startWith(null),
        tap(() => {
          this.GetDataSong();
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.GetDataSong();
  }

  DialogAdd() {
    this.title2 = 'add';
    const dialogRef = this.dialog.open(AddSongDialogComponent, {
      data: {
        Title: 'Add',
      },
    });
    console.log('data title22', this.title2);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result', result);
      if (this.title2 == 'add') {
        console.log('ini add');
        this.AddData(result);
      }
    });
  }

  EditData(e: any) {
    this.title2 = 'edit';
    const dialogRef = this.dialog.open(AddSongDialogComponent, {
      data: {
        Title: 'Edit',
        dataIsi: e,
      },
    });
    console.log('data edit', e);
    dialogRef.afterClosed().subscribe((result) => {
      if (this.title2 == 'edit') {
        console.log('data edit');
        this.UpdateData(e, result);
      }
    });
  }

  DetailPage(id: any) {
    console.log('data id', id);
    this.router.navigate([`/song/detail/${id}`]);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.FakeData.filter = filterValue.trim().toLowerCase();
  }

  Reset() {
    this.GetDataSong();
    // this.Tambahan();
  }

  GetDataSong() {
    const pagination = {
      limit: this.paginator.pageSize ? this.paginator.pageSize : 4,
      page: this.paginator.pageIndex ? this.paginator.pageIndex : 0,
    };

    this.subs.sink = this.songService
      .GetDataSong2(pagination)
      .subscribe((data) => {
        this.dataSource.data = data.data.getAllSong;

        this.paginator.length = data.data.getAllSong[0].count_document;
        this.dataCount = data.data.getAllSong[0].count_document;
        console.log('data count = ', data.data.getAllSong[0]);
      });
  }
  AddData(data: any) {
    this.subs.sink = this.songService
      .CreateSong(data)
      .subscribe((response: any) => {
        console.log('res graphql', response);
        this.GetDataSong();
      });
  }
  UpdateData(id: any, data: any) {
    console.log('id siallan', id._id);
    this.subs.sink = this.songService
      .UpdateSong(id._id, data)
      .subscribe((response: any) => {
        console.log('res graphql', response);
        this.GetDataSong();
      });
  }
  DeleteSong(id: any) {
    console.log('id nya');
    this.subs.sink = this.songService
      .DeleteDataSongid(id)
      .subscribe((response: any) => {
        console.log('res detail', response);
        this.GetDataSong();
      });
  }
  FilterName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterName = filterValue.trim().toLowerCase();
    // this.FakeData.filter = filterValue.trim().toLowerCase();
    this.subs.sink = this.songService
      .FilterDataSongName(this.filterName)
      .subscribe((response: any) => {
        console.log('respone filter', response);
      });
  }
}
