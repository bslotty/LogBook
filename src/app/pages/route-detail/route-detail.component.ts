import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Asset, DataService, Route } from 'src/app/services/data.service';
import { IconButton } from 'src/app/UI/components/icon/icon.component';

@Component({
  selector: 'app-route-detail',
  templateUrl: './route-detail.component.html',
  styles: [
  ]
})
export class RouteDetailComponent implements OnInit {

  public route: Route;
  public assets: Asset[];

  public buttons: IconButton[];
  
  constructor(
    public _data: DataService,
    public actRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get("id");
    

    this._data.setID(+id);

    this.buttons = [
      new IconButton("create").setButtonColor("accent").setIconName("plus").setIconColor("light")
    ];

    this._data.assets.pipe(map((al:Asset[]) => al.filter((a:Asset) => a.route_id == +id)))
    .subscribe(a => this.assets = a);


    this.route = this._data.getRouteByID(+id);
    
    if (this.route == undefined) this._data.notSetRedirect();
  

    
    

  }

  headerEvent(event) {
    
  
    if (event == "create"){
      this._data.openCreateAssetDialog();
    }
  }

}
