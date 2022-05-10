import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongTableListsComponent } from './song-table-lists/song-table-lists.component';
import { AddSongDialogComponent } from './add-song-dialog/add-song-dialog.component';
import { SongDetailPageComponent } from './song-detail-page/song-detail-page.component';
import { SongRoutingModule } from './song-routing.module';

@NgModule({
  declarations: [
    SongTableListsComponent,
    AddSongDialogComponent,
    SongDetailPageComponent,
  ],
  imports: [CommonModule, SongRoutingModule],
})
export class SongModule {}
