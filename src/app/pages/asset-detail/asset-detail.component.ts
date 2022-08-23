import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs/internal/observable/from';
import { Asset, DataService, Photo } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { FormInputField } from 'src/app/UI/components/form-field/form-field.component';
import { IconButton } from 'src/app/UI/components/icon/icon.component';
import { DialogService } from 'src/app/UI/services/dialog.service';
import { PingService } from 'src/app/UI/services/ping.service';
import { MatColor } from 'src/app/UI/services/utilities.service';


function getBase64(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onload = function () { resolve(reader.result); };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}


@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styles: [
  ]
})
export class AssetDetailComponent implements OnInit {

  public asset: Asset;
  // public photos: Photo[];

  public assetForm: FormGroup;
  public metricForm: FormGroup;
  public assetControls: FormInputField[];
  public metricControls: FormInputField[];

  public assetButtons: IconButton[] = [];
  public photoButtons: IconButton[] = [];


  constructor(
    public actRoute: ActivatedRoute,
    public _data: DataService,
    public _form: FormService,
    public _dialog: DialogService,
    public _ping: PingService,
  ) { }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get("id");
    this.asset = this._data.getAssetByID(id);

    //  Guard
    if (this.asset == undefined) this._data.notSetRedirect();


    //  Form Setup
    this.assetForm = this._form.initAssetForm();
    this.assetControls = this._form.assetFormMap(this.assetForm, this._data.manufacturers.value);

    //  Init Form Values
    this.assetForm.get("name").setValue(this.asset.name);
    this.assetForm.get("serialNo").setValue(this.asset.serialNo);
    this.assetForm.get("manufacturer").setValue(this.asset.manufacturer.id);

    this.metricForm = this._form.initMetricForm();
    this.metricControls = this._form.metricFormMap(this.metricForm);
    this.metricForm.get("created").setValue(this.asset.metrics.created);
    this.metricForm.get("modified").setValue(this.asset.metrics.modified);
    this.metricForm.get("completed").setValue(this.asset.metrics.completed);
    this.metricForm.get("verified").setValue(this.asset.metrics.verified);


    this.setHeaderButtons();


    // this._data.photos.subscribe(p => this.photos = p);
  }

  setHeaderButtons(){
    this.assetButtons = [];
    this.photoButtons = [];

    if (this.assetForm.enabled) {
      if (!this.metricForm.get("completed").valid){
        this.assetButtons.push(new IconButton("save")
          .setIconName("save")
          .setButtonColor("transparent")
          .setIconColor("accent"));

        this.photoButtons.push(new IconButton("upload")
        .setIconName("upload")
        .setButtonColor("transparent")
        .setIconColor("primary"));
      }


      if (!this.metricForm.get("verified").valid) {
        this.assetButtons.push(new IconButton("verify")
          .setIconName("check-circle")
          .setButtonColor("transparent")
          .setIconColor("accent"));
      } else {
        this.assetButtons = [];
        this.photoButtons = [];
      }
    }

    
  }


  headerEvent(event) {
    

    if (( this.assetForm.valid ) && this.asset.photos.length > 0) {
      if (event == "save") {

        this.asset.metrics.setModified();
        this.metricForm.get("modified").setValue(this.asset.metrics.modified);

        this._ping.send(MatColor.accent, "Asset Saved!");

      } else if (event == "verify") {

        if (this.asset.metrics.completed == undefined) {

          this.asset.metrics.setCompleted()
          this.metricForm.get("completed").setValue(this.asset.metrics.completed);
          this._ping.send(MatColor.accent, "Asset Completed!");

        } else if (this.asset.metrics.verified == undefined) {

          this._dialog.initSettings("Verify", "Do you want to verify and close this Asset?");
          this._dialog.open("confirm").subscribe(r => {
            if (r) {
              this.asset.metrics.setVerified()
              this.metricForm.get("verified").setValue(this.asset.metrics.verified);

              this.assetForm.disable();
              this.setHeaderButtons();
              this._ping.send(MatColor.accent, "Asset Verified!");
            }
          });

        }
      }

      this.setHeaderButtons();

    } else {
      // 
      this._ping.send(MatColor.warn, "Form Invalid");
    }

  }

  photoHeaderEvent(event) {
    
    if (event == "upload") {
      document.getElementById("upload-input").click();
    }
  }

  photoInputChange(event) {
    if (event.target.files.length > 0) {
      Array.from(event.target.files).forEach((f: File) => {

        from(getBase64(f)).subscribe(res => {
          let base = res + "";
          let name = this.regexPhotoName(f.name)

          let p = new Photo(this._data.getNewID())
            .setName(name)
            .setType(f.type)
            .setSize(f.size)
            .setBase64(base)

          // this._data.createPhoto(p);
          // this.asset.addPhoto(p);

          this._data.getAssetByID(this.asset.id).addPhoto(p);
        });
      });
    }
  }




  regexPhotoBase64(base) {
    let regex = /^data:(.+);(.+),(.+)/;
    let m;

    if ((m = regex.exec(base)) !== null) {
      base = m[3];
    }

    return base;

  }

  regexPhotoName(name) {
    let regex = /(.+)\.(\S+)/;
    let m;

    if ((m = regex.exec(name)) !== null) {
      name = m[1];
    }

    return name;
  }


}
