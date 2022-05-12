import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SongService } from '../song.service';
import { MatDialog } from '@angular/material/dialog';
import { AddSongDialogComponent } from '../add-song-dialog/add-song-dialog.component';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-song-table-lists',
  templateUrl: './song-table-lists.component.html',
  styleUrls: ['./song-table-lists.component.scss'],
})
export class SongTableListsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  FakeData: any;
  dataSource: any;

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
    // this.FakeData = new MatTableDataSource(this.songService.SongList);
    this.Tambahan();
  }

  Tambahan() {
    this.FakeData.sort = this.sort;
    this.FakeData.paginator = this.paginator;
  }

  ngOnInit(): void {
    // this.FakeData = this.songService.SongList;
    // console.log('data fake', this.FakeData);
    this.GetData();
    // this.GetData2();
    // this.FakeData = new MatTableDataSource(this.songService.directories);
    console.log('data fake', this.FakeData);
  }
  GetData() {
    this.songService.directories.subscribe((response: any) => {
      console.log('res', response);
      this.FakeData = new MatTableDataSource(response);
    });
  }

  DialogAdd() {
    const dialogRef = this.dialog.open(AddSongDialogComponent, {
      data: {
        Title: 'Add',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  EditData(e: any) {
    console.log('data edit', e);
    const dialogRef = this.dialog.open(AddSongDialogComponent, {
      data: {
        Title: 'Edit',
        dataIsi: e,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
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

  // sort
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  Reset() {
    this.GetData();
    this.Tambahan();
  }
  // GetData2() {
  //   this.songService.GetDataSong().subscribe((response: any) => {
  //     console.log('res graphql', response);
  //   });
  // }
}
