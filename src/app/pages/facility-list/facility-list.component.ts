import { Component, OnInit } from '@angular/core';
import { DataService, Facility } from 'src/app/services/data.service';
import { IconButton } from 'src/app/UI/components/icon/icon.component';

@Component({
  selector: 'app-facility-list',
  templateUrl: './facility-list.component.html',
  styles: [
  ]
})
export class FacilityListComponent implements OnInit {

  public buttons: IconButton[] = [];
  public title: string = "Facility List";

  public facilities: Facility[];

  constructor(
    public _data: DataService,
  ) { }

  ngOnInit(): void {
    this.buttons = [
      new IconButton("create")
        .setButtonColor("accent")
        .setIconColor("light")
        .setIconName("plus"),
    ];

    this._data.facilities.subscribe(f => this.facilities = f);

    
  }

  headerEvent(event) {
    
  
    if (event == "create"){
      this._data.openCreateFacilityDialog();
    }
  }

}
