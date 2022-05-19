import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { SongService, Filter, Sorting } from '../song.service';
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
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-song-table-lists',
  templateUrl: './song-table-lists.component.html',
  styleUrls: ['./song-table-lists.component.scss'],
})
export class SongTableListsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataCount = 0;
  // filter

  // filter
  Filter!: Filter;
  filterName: any;
  filterGenre: any;
  filterCreated: any;

  SortingName = '';

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
    console.log('sort nya?', this.sort);
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
    console.log('sort nya?', this.sort);
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
    const FilterSong = {
      name: this.filterName ? this.filterName : '',
      genre: this.filterGenre ? this.filterGenre : '',
      creator_name: this.filterCreated ? this.filterCreated : '',
    };
    let Sorting = {
      name: this.SortingName ? this.SortingName : '',
    };
    console.log('data page filter', FilterSong);
    this.subs.sink = this.songService
      .GetDataSong2(pagination, FilterSong)
      .subscribe((data) => {
        if (data && data.data.getallsong) {
          console.log('data page', data);
          this.dataSource.data = data.data.getAllSong;

          this.paginator.length = data.data.getAllSong[0].count_document;
          this.dataCount = data.data.getAllSong[0].count_document;
          this.dataSource.sort = this.sort;

          setTimeout(() => {
            this.spinner.hide();
          }, 2000);
        }
      });
  }
  AddData(data: any) {
    if (data.status == 'VALID') {
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          console.log('hasil input', data.value);
          const payload = {
            name: data.value.name,

            genre: data.value.genre,
            duration: parseInt(data.value.duration),
          };
          this.subs.sink = this.songService
            .CreateSong(payload)
            .subscribe((response: any) => {
              console.log('res graphql', response);

              Swal.fire('Saved!', 'Add Succsess', 'success').then(() => {
                this.GetDataSong();
              });
            });
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
    } else {
      Swal.fire('please refill again', '', 'info');
    }
  }
  UpdateData(id: any, data: any) {
    if (data.status == 'VALID') {
      Swal.fire({
        title: 'Do you want to save the changes?',

        showCancelButton: true,
        confirmButtonText: 'Save',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          console.log('hasil input', data.value);
          const payload = {
            name: data.value.name,

            genre: data.value.genre,
            duration: parseInt(data.value.duration),
          };
          this.subs.sink = this.songService
            .UpdateSong(id._id, payload)
            .subscribe((response: any) => {
              Swal.fire('Saved!', 'Edit Succsess', 'success').then(() => {
                this.GetDataSong();
              });
            });
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'error');
        }
      });
    } else {
      Swal.fire('please refill again', '', 'error');
    }
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
            Swal.fire('Saved!', 'Delete Succsess', 'success').then(() => {
              this.GetDataSong();
            });
          });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'error');
      }
    });
  }
  FilterName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterName = filterValue.trim().toLowerCase();
    // this.Filter.name = filterValue.trim().toLowerCase();

    if (this.filterName >= 3) {
      this.GetDataSong();
    }
  }

  FilterGenre(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterGenre = filterValue.trim().toLowerCase();
    if (this.filterGenre.length >= 3) {
      this.GetDataSong();
    }
  }
  FilterCreatedBy(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterCreated = filterValue.trim().toLowerCase();
    if (this.filterCreated.length >= 3) {
      this.GetDataSong();
    }
  }

  LogOut() {
    this.router.navigate(['login']);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.active == 'name') {
      console.log('sortname', sortState.direction);
      this.SortingName = sortState.direction;
      console.log('sort name', this.SortingName);
      this.SortByName(sortState.direction);
      this.GetDataSong();
    } else if (sortState.active == 'genre') {
      console.log('sortgenre');

      this.SortByGenre(sortState.direction);
      this.GetDataSong();
    } else if (sortState.active == 'created') {
      console.log('sortcreated');
      this.SortByCreated(sortState.direction);
      this.GetDataSong();
    } else {
      console.log('yah gagal');
    }
  }

  SortByName(data: any) {
    console.log('data soor', data);
    this.subs.sink = this.songService
      .SortDataSongName(data)
      .subscribe((response: any) => {
        console.log('respone sort', response);
        this.dataSource.data = response.data.getAllSong;
        this.dataSource.sort = this.sort;
        // this.dataSource.sort = response.data.getAllSong;
      });
  }
  SortByGenre(data: any) {
    console.log('data soor', data);
    this.subs.sink = this.songService
      .SortDataSongGenre(data)
      .subscribe((response: any) => {
        console.log('respone sort', response);
        this.dataSource.data = response.data.getAllSong;
        this.dataSource.sort = this.sort;
      });
  }
  SortByCreated(data: any) {
    console.log('data soor', data);
    this.subs.sink = this.songService
      .SortDataSongCreated(data)
      .subscribe((response: any) => {
        console.log('respone sort', response);
        this.dataSource.data = response.data.getAllSong;
        this.dataSource.sort = this.sort;
      });
  }
}
