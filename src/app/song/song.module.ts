import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongTableListsComponent } from './song-table-lists/song-table-lists.component';
import { AddSongDialogComponent } from './add-song-dialog/add-song-dialog.component';
import { SongDetailPageComponent } from './song-detail-page/song-detail-page.component';
import { SongRoutingModule } from './song-routing.module';
import { SharedModule } from '../shared/shared.module';
import { GraphQLModule } from '../graphql.module';

@NgModule({
  declarations: [
    SongTableListsComponent,
    AddSongDialogComponent,
    SongDetailPageComponent,
  ],
  imports: [CommonModule, SongRoutingModule, SharedModule, GraphQLModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SongModule {}
