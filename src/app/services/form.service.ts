import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormInputField, FormInputTypes } from '../UI/components/form-field/form-field.component';
import { FormGeneralService } from '../UI/services/form-general.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    public _general: FormGeneralService,
    public builder: FormBuilder,
  ) {   }

  initFacilityForm(): FormGroup {
    return this.builder.group({
      name   : ["", [Validators.required, Validators.maxLength(1024)]],
      // address: ["", [Validators.required, Validators.maxLength(1024)]],
      // city   : ["", [Validators.required, Validators.maxLength(1024)]],
      // state  : ["", [Validators.required, Validators.maxLength(1024)]],
      // zip    : [undefined, [Validators.required, Validators.maxLength(5)]],
    });
  }

  facilityFormMap(form: FormGroup): FormInputField[] {
    return [
      new FormInputField()
        .setLabel("Name")
        .setType(FormInputTypes.text)
        .setControl(form.get("name")),

      // new FormInputField()
      //   .setLabel("Address")
      //   .setType(FormInputTypes.text)
      //   .setControl(form.get("address")),

      // new FormInputField()
      //   .setLabel("City")
      //   .setType(FormInputTypes.text)
      //   .setControl(form.get("city")),

      // new FormInputField()
      //   .setLabel("State")
      //   .setType(FormInputTypes.text)
      //   .setControl(form.get("state")),

      // new FormInputField()
      // .setLabel("Zip")
      // .setType(FormInputTypes.text)
      // .setControl(form.get("zip")),
    ]
  }


  initRouteForm(): FormGroup {
    return this.builder.group({
      name   : ["", [Validators.required, Validators.maxLength(1024)]],
    });
  }

  routeFormMap(form: FormGroup): FormInputField[] {
    return [
      new FormInputField()
        .setLabel("Name")
        .setType(FormInputTypes.text)
        .setControl(form.get("name")),
    ]
  }

  


  initAssetForm(): FormGroup {
    return this.builder.group({
      name        : ["", [Validators.required, Validators.maxLength(1024)]],
      serialNo    : ["", [Validators.required, Validators.maxLength(1024)]],
      manufacturer: ["", [Validators.required, Validators.maxLength(1024)]],
    });
  }

  assetFormMap(form: FormGroup, mL: any[]): FormInputField[] {
    return [
      new FormInputField()
        .setLabel("Name")
        .setType(FormInputTypes.text)
        .setControl(form.get("name")),

      new FormInputField()
        .setLabel("Serial Number")
        .setType(FormInputTypes.text)
        .setControl(form.get("serialNo")),

      new FormInputField()
        .setLabel("Manufacturer")
        .setType(FormInputTypes.select)
        .setControl(form.get("manufacturer"))
        .setOptions(mL.map(l => {return {id: l.id, name: l.full_name} }).sort((a,b)=> a.name < b.name ? -1 : 1) ),
    ]
  }

  modified : Date;
  completed: Date;
  verified : Date;

  initMetricForm(): FormGroup {
    return this.builder.group({
      created  : ["", [Validators.required, Validators.maxLength(1024)]],
      modified : ["", [Validators.required, Validators.maxLength(1024)]],
      completed: ["", [Validators.required, Validators.maxLength(1024)]],
      verified : ["", [Validators.required, Validators.maxLength(1024)]],
    });
  }

  metricFormMap(form: FormGroup): FormInputField[] {
    return [
      new FormInputField()
        .setLabel("Created On")
        .setType(FormInputTypes.date)
        .setControl(form.get("created"))
        .disable(),

      new FormInputField()
        .setLabel("Modified On")
        .setType(FormInputTypes.date)
        .setControl(form.get("modified"))
        .disable(),

      new FormInputField()
        .setLabel("Completed On")
        .setType(FormInputTypes.date)
        .setControl(form.get("completed"))
        .disable(),

      new FormInputField()
        .setLabel("Verified On")
        .setType(FormInputTypes.date)
        .setControl(form.get("verified"))
        .disable(),
    ]
  }



  initPhotoForm (): FormGroup {
    return this.builder.group({
      name  : ["", [Validators.required, Validators.maxLength(1024)]],
    });
  }

  photoFormMap(form: FormGroup): FormInputField[] {
    return [
      new FormInputField()
        .setLabel("Name")
        .setType(FormInputTypes.text)
        .setControl(form.get("name"))
    ];
  }

}
