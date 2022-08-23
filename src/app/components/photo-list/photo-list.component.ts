import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { DataService, Photo } from 'src/app/services/data.service';
import { DialogService } from 'src/app/UI/services/dialog.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styles: [
  ]
})
export class PhotoListComponent implements OnInit {

  public photos: Photo[];

  constructor(
    public actRoute: ActivatedRoute,
    
    public _data: DataService,
    public _dialog: DialogService,

  ) { }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get("id");
    this._data.assets.pipe(map(al => al.find(a => a.id == id))).subscribe(a => this.photos = a.photos);
  }

  openPhotoDiag(p: Photo){
    this._dialog.settings.data.photo = p;
    this._dialog.open("viewPhoto").subscribe(r => {});
  }

}
