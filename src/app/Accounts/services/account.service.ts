import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DialogService } from 'src/app/UI/services/dialog.service';
import { MatColor } from 'src/app/UI/services/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountList: BehaviorSubject<Account[]> = new BehaviorSubject<Account[]>([]);
  public accountDetail: BehaviorSubject<Account> = new BehaviorSubject<Account>(undefined);

  constructor(
    public _dialog: DialogService,
  ) { }

  getUserAccount(){
    return this.accountDetail.value;
  }

  getAccountByID(id: number){
    return this.accountList.value.find(a => a.id == id);
  }

  setActiveAccount( account: Account ){
    this.accountDetail.next( account );
  }

  openSelectAccountDialog(){
    this._dialog.initSettings("Select Account", "Choose an account from the dropdown menu to change to.");
    this._dialog.settings.data.accounts = this.accountList.value;
    this._dialog.open("SelectAccount");
  }
}








export class Account {
  id: number;
  type: AccountType;
  name: string;
  picture: string;

  mentor: number;


  constructor(id) {
    this.id = id;
  }

  setName(name: string){
    this.name = name;
    return this;
  }

  setPicture(url: string) {
    this.picture = url;
    return this;
  }

  setType(type: string) {
    this.type = AccountType[type];
    return this;
  }

}

export enum AccountType {
  Student, Mentor
}

export enum AccountColor {
  Student = MatColor.accent,
  Mentor = MatColor.warn,
}


