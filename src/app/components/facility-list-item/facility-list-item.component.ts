import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, Facility } from 'src/app/services/data.service';
import { IconButton } from 'src/app/UI/components/icon/icon.component';

@Component({
  selector: 'app-facility-list-item',
  templateUrl: './facility-list-item.component.html',
  styles: [
  ]
})
export class FacilityListItemComponent implements OnInit {

  @Input() facility: Facility;

  link: IconButton;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.link = new IconButton("link")
      .setIconName("chevron-right")
      .setButtonColor("transparent")
      .setIconColor("primary")
  }

  view(f: Facility){

    this.router.navigate(["facility", f.id]);

  }
}
