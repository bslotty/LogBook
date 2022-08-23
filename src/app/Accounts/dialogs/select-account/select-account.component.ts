import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { combineLatest, filter, Observable, of, Subject } from 'rxjs';
import { FormInputField, FormInputTypes } from 'src/app/UI/components/form-field/form-field.component';
import { Account, AccountService, AccountType } from '../../services/account.service';

@Component({
  selector: 'app-select-account',
  templateUrl: './select-account.component.html',
  styles: [
  ]
})
export class SelectAccountComponent implements OnInit {

  filteredAccounts: Account[];
  shownAccounts: Account[];

  excluded: number;

  form: FormGroup;
  formField: FormInputField;

  // sections: CourseIcon[];

  constructor(    
    public _diagref: MatDialogRef<SelectAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public cdRef: ChangeDetectorRef,

    // public _form: FormService,
    // public _data: DataService,
    public _account: AccountService,
  ) {
    //  Setup Form
    // this.form      = this._form.initResponseForm();
    this.formField = new FormInputField()
      .setControl(this.form.get("text") as FormControl)
      .setType(FormInputTypes.text);


    //  Listen to Changes
    this.formField.control.valueChanges.subscribe(v => {
      this.filteredAccounts = this.data.accounts.filter( a => ( JSON.stringify(a) + AccountType[a.type]  ).toLowerCase().includes( v.toLowerCase() ) );
      this.shownAccounts    = this.filteredAccounts.filter( (a,i) => i < 5 );

      if (this.filteredAccounts.length != this.shownAccounts.length) {
        this.excluded = this.filteredAccounts.length - this.shownAccounts.length 
      } else {
        this.excluded = undefined;
      }
    });

  }

  ngOnInit(): void {
    this.formField.control.setValue("");
  }

  selectUser(account: Account){
    this._account.setActiveAccount(account);
    this.close();
  }

  close(){
    this._diagref.close();
  }

  filterByType(type: string){
    this.formField.control.setValue(type);
    // this.formField.control.updateValueAndValidity()
  }

  filterBySection(i: number){
    // this.formField.control.setValue( CourseSection[i] )
  }

}


// class CourseIcon{
//   icon       : string;
//   section    : CourseSection;

//   constructor(){}

//   setIcon(name: string){
//     this.icon = name;
//     return this;
//   }

//   setSection(section: CourseSection){
//     this.section     = section;
//     return this;
//   } 

//   getSectionName(): string {
//     return CourseSection[this.section];
//   }

// }
