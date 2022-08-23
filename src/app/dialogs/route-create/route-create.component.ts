import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { FormInputField } from 'src/app/UI/components/form-field/form-field.component';
import { IconButton } from 'src/app/UI/components/icon/icon.component';

@Component({
  selector: 'app-route-create',
  templateUrl: './route-create.component.html',
  styles: [
  ]
})
export class RouteCreateComponent implements OnInit {


  public title: string = "Create Route";
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
    public _diagref: MatDialogRef<RouteCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public cdRef: ChangeDetectorRef,

    public _form: FormService,
    public _data: DataService,
  ) { }

  ngOnInit(): void {
    this.form     = this._form.initRouteForm()
    this.controls = this._form.routeFormMap( this.form );

    // this.form.valueChanges.subscribe(f => {
    //   this.valid = this._form._general.isValid(f)
    //   console.log("valid: ", this.valid, f);
    // })
  }

  headerEvent(event){
    if (event == "close"){
      this._diagref.close();
    }
  }

  create() {
    if (this._form._general.isValid(this.form)) {
      let route = this.data.route
        .setName( this.form.value.name )
        // .setAddress( this.form.value.address )
        // .setCity( this.form.value.city )
        // .setState( this.form.value.state )
        // .setZip( this.form.value.zip )

      this._data.createRoute( route );
      this.close()
    } else { }
  }

  close(){
    this._diagref.close();
  }
}
