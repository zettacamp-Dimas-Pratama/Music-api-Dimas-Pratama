import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SongDetailPageComponent } from './song-detail-page/song-detail-page.component';
import { SongTableListsComponent } from './song-table-lists/song-table-lists.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: SongTableListsComponent },
  { path: 'detail/:id', component: SongDetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class SongRoutingModule {}
