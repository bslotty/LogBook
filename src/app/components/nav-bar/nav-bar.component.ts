import { Component, OnInit } from '@angular/core';
import { Account, AccountService } from 'src/app/Accounts/services/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styles: [
  ]
})
export class NavBarComponent implements OnInit {

  public account: Account;

  constructor(
    public _account: AccountService
  ) { }

  ngOnInit(): void {
    this._account.accountDetail.subscribe(a =>{
      this.account = this._account.getUserAccount();
    });
    
  }

  changeAccount(){
    this._account.openSelectAccountDialog();
  }

}
