import {
  Component,
  EventEmitter,
  Inject,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubSink } from 'subsink';
import { SongTableListsComponent } from '../song-table-lists/song-table-lists.component';
import { SongService } from '../song.service';

@Component({
  selector: 'app-add-song-dialog',
  templateUrl: './add-song-dialog.component.html',
  styleUrls: ['./add-song-dialog.component.scss'],
})
export class AddSongDialogComponent implements OnInit, OnChanges {
  CreateForm!: FormGroup;
  DataKirim: any;

  DataSong: any;
  private subs = new SubSink();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private songService: SongService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changges', changes);
  }

  ngOnInit(): void {
    this.FormGroup();

    console.log('data kiriman', this.data);
    if (this.data.Title == 'Edit') {
      this.DataEdit();
    }
  }

  FormGroup() {
    this.CreateForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      genre: new FormControl(null, Validators.required),
      duration: new FormControl(null, Validators.required),
    });
  }
  DataEdit() {
    console.log('data isis', this.data);
    this.CreateForm.setValue({
      name: this.data.dataIsi.name,
      genre: this.data.dataIsi.genre,
      duration: this.data.dataIsi.duration,
    });
  }

  MDataKirim() {
    if (this.data.Title == 'Add') {
      this.DataKirim = {
        title: 'add',
        data: this.CreateForm.value,
      };
    } else if (this.data.Title == 'Edit') {
      this.DataKirim = {
        title: 'Edit',
        data: this.CreateForm.value,
      };
    } else {
      ('yah gagal');
    }
  }
  AddData() {
    this.subs.sink = this.songService
      .CreateSong(this.CreateForm.value)
      .subscribe((response: any) => {
        console.log('res graphql', response);
      });
  }
}
