import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongTableListsComponent } from './song-table-lists.component';

describe('SongTableListsComponent', () => {
  let component: SongTableListsComponent;
  let fixture: ComponentFixture<SongTableListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongTableListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongTableListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
