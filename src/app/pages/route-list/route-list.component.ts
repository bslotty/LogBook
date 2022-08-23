import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';
import { Route, Facility, DataService } from 'src/app/services/data.service';
import { IconButton } from 'src/app/UI/components/icon/icon.component';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styles: [
  ]
})
export class RouteListComponent implements OnInit {

  public facility: Facility;
  public routes: Route[];

  public buttons: IconButton[];
  
  constructor(
    public _data: DataService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("id");

    this._data.setID(+id);
    

    this.facility = this._data.getFacilityByID(+id);
    
  
    this.buttons = [
      new IconButton("create").setButtonColor("accent").setIconName("plus").setIconColor("light")
    ];

    
    this._data.routes.pipe(map((rl:Route[]) => rl.filter((r: Route) => +r.facility_id == +id)))
      .subscribe(r => this.routes = r);

  }

  headerEvent(event) {
    
  
    if (event == "create"){
      this._data.openCreateRouteDialog();
    }
  }

}
