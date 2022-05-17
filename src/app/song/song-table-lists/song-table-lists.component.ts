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
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-song-table-lists',
  templateUrl: './song-table-lists.component.html',
  styleUrls: ['./song-table-lists.component.scss'],
})
export class SongTableListsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dataCount = 0;
  filterName: any;
  filterGenre: any;
  filterCreatedBy: any;
  FakeData: any;
  DataSong: any;
  dataSource = new MatTableDataSource<any>([]);
  pageSizeOptions: number[] = [5, 6, 8, 10];
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
    private _liveAnnouncer: LiveAnnouncer,
    private spinner: NgxSpinnerService
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
        console.log('ini add', result);
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
    this.spinner.show();
    const pagination = {
      limit: this.paginator.pageSize ? this.paginator.pageSize : 10,
      page: this.paginator.pageIndex ? this.paginator.pageIndex : 0,
    };

    this.subs.sink = this.songService
      .GetDataSong2(pagination)
      .subscribe((data) => {
        console.log('data page', data.data.getAllSong[0].count_document);
        this.dataSource.data = data.data.getAllSong;

        this.paginator.length = data.data.getAllSong[0].count_document;
        this.dataCount = data.data.getAllSong[0].count_document;

        this.spinner.hide();
      });
  }
  AddData(data: any) {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (data.status == 'VALID') {
          console.log('hasil input', data.value);
          this.subs.sink = this.songService
            .CreateSong(data.value)
            .subscribe((response: any) => {
              console.log('res graphql', response);
              this.GetDataSong();
            });
          Swal.fire('Saved!', 'Add Succsess', 'success');
        } else {
          Swal.fire('please refill again', '', 'info');
        }
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
  UpdateData(id: any, data: any) {
    console.log('id siallan', id._id);
    Swal.fire({
      title: 'Do you want to save the changes?',

      showCancelButton: true,
      confirmButtonText: 'Save',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (data.status == 'VALID') {
          console.log('hasil input', data.value);
          this.subs.sink = this.songService
            .UpdateSong(id._id, data.value)
            .subscribe((response: any) => {
              console.log('res graphql', response);
              this.GetDataSong();
              Swal.fire('Saved!', 'Edit Succsess', 'success');
            });
        } else {
          Swal.fire('please refill again', '', 'error');
        }
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'error');
      }
    });
  }
  DeleteSong(id: any) {
    console.log('id nya');
    Swal.fire({
      title: 'Do you want to Delete Data?',

      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.subs.sink = this.songService
          .DeleteDataSongid(id)
          .subscribe((response: any) => {
            console.log('res detail', response);
            this.GetDataSong();
            Swal.fire('Saved!', 'Delete Succsess', 'success');
          });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'error');
      }
    });
  }
  FilterName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterName = filterValue.trim().toLowerCase();
    // this.FakeData.filter = filterValue.trim().toLowerCase();
    const payload = {
      name: this.filterName,
    };
    this.subs.sink = this.songService
      .FilterDataSong(payload)
      .subscribe((response: any) => {
        console.log('respone filter', response);
        this.dataSource.data = response.data.getAllSong;
      });
  }
  FilterGenre(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterGenre = filterValue.trim().toLowerCase();
    // this.FakeData.filter = filterValue.trim().toLowerCase();
    const payload = {
      genre: this.filterGenre,
    };
    this.subs.sink = this.songService
      .FilterDataSong(payload)
      .subscribe((response: any) => {
        console.log('respone filter', response);
        this.dataSource.data = response.data.getAllSong;
      });
  }
  FilterCreatedBy(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterCreatedBy = filterValue.trim().toLowerCase();
    // this.FakeData.filter = filterValue.trim().toLowerCase();
    const payload = {
      creator_name: this.filterCreatedBy,
    };
    this.subs.sink = this.songService
      .FilterDataSong(payload)
      .subscribe((response: any) => {
        console.log('respone filter', response);
        this.dataSource.data = response.data.getAllSong;
      });
  }

  LogOut() {
    this.router.navigate(['login']);
  }
}
