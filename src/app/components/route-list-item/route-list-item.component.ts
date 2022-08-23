import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Facility, Route } from 'src/app/services/data.service';
import { IconButton } from 'src/app/UI/components/icon/icon.component';

@Component({
  selector: 'app-route-list-item',
  templateUrl: './route-list-item.component.html',
  styles: [
  ]
})
export class RouteListItemComponent implements OnInit {

  @Input() route: Route;

  link: IconButton;


  constructor(
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.link = new IconButton("link")
      .setIconName("chevron-right")
      .setButtonColor("transparent")
      .setIconColor("primary")
  }

  view(r: Route){
    this.router.navigate(["route", r.id])
  }

}
