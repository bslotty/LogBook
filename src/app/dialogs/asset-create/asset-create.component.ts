import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { FormInputField } from 'src/app/UI/components/form-field/form-field.component';
import { IconButton } from 'src/app/UI/components/icon/icon.component';
import { FacilityCreateComponent } from '../facility-create/facility-create.component';

@Component({
  selector: 'app-asset-create',
  templateUrl: './asset-create.component.html',
  styles: [
  ]
})
export class AssetCreateComponent implements OnInit {

  public title: string = "Create Asset";
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
    this.form     = this._form.initAssetForm()
    this.controls = this._form.assetFormMap( this.form, this._data.manufacturers.value );

  }

  headerEvent(event){
    if (event == "close"){
      this._diagref.close();
    }
  }

  create() {
    if (this._form._general.isValid(this.form)) {
      let asset = this.data.asset
        .setName( this.form.value.name )
        .setSerialNumber( this.form.value.serialNo )
        .setManufacturer( this._data.manufacturers.value.find(m => m.id == this.form.value.manufacturer ))

      this._data.createAsset(asset);
      this.close()
    } else { }
  }

  close(){
    this._diagref.close();
  }

}
