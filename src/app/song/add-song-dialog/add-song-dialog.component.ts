import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SongService } from '../song.service';

@Component({
  selector: 'app-add-song-dialog',
  templateUrl: './add-song-dialog.component.html',
  styleUrls: ['./add-song-dialog.component.scss'],
})
export class AddSongDialogComponent implements OnInit {
  CreateForm!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private songService: SongService
  ) {}

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
      createdBy: new FormControl(null, Validators.required),
    });
  }
  DataEdit() {
    this.CreateForm.setValue({
      name: this.data.dataIsi.name,
      genre: this.data.dataIsi.genre,
      duration: this.data.dataIsi.duration,
      createdBy: this.data.dataIsi.createdBy,
    });
  }

  AddData() {
    if (this.data.Title == 'Add') {
      this.songService.tambahCard(this.CreateForm.value);
    }
  }
}
