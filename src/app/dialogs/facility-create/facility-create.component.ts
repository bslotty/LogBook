import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService, Facility } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { FormInputField } from 'src/app/UI/components/form-field/form-field.component';
import { IconButton } from 'src/app/UI/components/icon/icon.component';
import { FormGeneralService } from 'src/app/UI/services/form-general.service';

@Component({
  selector: 'app-facility-create',
  templateUrl: './facility-create.component.html',
  styles: [
  ]
})
export class FacilityCreateComponent implements OnInit {

  public title: string = "Create Facility";
  public buttons: IconButton[] = [
    new IconButton("close")
      .setIconName("x")
      .setButtonColor("transparent")
      .setIconColor("")
  ]

  public form: FormGroup;
  public controls: FormInputField[];

  public valid: boolean = false;

  constructor(    
    public _diagref: MatDialogRef<FacilityCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public cdRef: ChangeDetectorRef,

    public _form: FormService,
    public _data: DataService,
  ) { }

  ngOnInit(): void {
    console.log("dialog.data: ", this.data)

    this.form     = this._form.initFacilityForm()
    this.controls = this._form.facilityFormMap( this.form );

  }

  headerEvent(event){
    if (event == "close"){
      this._diagref.close();
    }
  }

  create() {

    if (this._form._general.isValid(this.form)) {
      let fac = this.data.facility
        .setName( this.form.value.name )
        .setAddress( this.form.value.address )
        .setCity( this.form.value.city )
        .setState( this.form.value.state )
        .setZip( this.form.value.zip )

      this._data.createFacility(fac);
      this.close()
    } else { }
  }

  close(){
    this._diagref.close();
  }

}
