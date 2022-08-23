import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Asset } from 'src/app/services/data.service';
import { IconButton } from 'src/app/UI/components/icon/icon.component';

@Component({
  selector: 'app-asset-list-item',
  templateUrl: './asset-list-item.component.html',
  styles: [
  ]
})
export class AssetListItemComponent implements OnInit {

  @Input() asset: Asset;

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

  view(a: Asset){

    this.router.navigate(["asset", a.id]);

  }
}
