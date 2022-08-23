import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IconButton } from 'src/app/UI/components/icon/icon.component';
import { MatColor } from 'src/app/UI/services/utilities.service';
import { Account } from '../../services/account.service';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styles: [
  ]
})
export class AccountCardComponent implements OnInit,OnChanges {

  @Input() account: Account;
  type: string;
  icon: IconButton;


  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(){
  }
}



