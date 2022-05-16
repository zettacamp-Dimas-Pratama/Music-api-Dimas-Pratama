import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { SongService } from '../song.service';

@Component({
  selector: 'app-song-detail-page',
  templateUrl: './song-detail-page.component.html',
  styleUrls: ['./song-detail-page.component.scss'],
})
export class SongDetailPageComponent implements OnInit {
  dataDetail: any;
  id: any;
  private subs = new SubSink();
  constructor(
    private songService: SongService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.GetDataSongDetail(this.id);
    // this.DataDetail();
  }

  // DataDetail() {
  //   this.dataDetail = this.songService.getEditid(this.id);
  //   console.log('data detail', this.dataDetail);
  // }
  Kembali() {
    this.router.navigate(['/song']);
  }
  GetDataSongDetail(id: any) {
    this.subs.sink = this.songService
      .GetDataSongid(id)
      .subscribe((response: any) => {
        console.log('res detail', response);
        this.dataDetail = response.data.getSongById;
      });
  }
}
