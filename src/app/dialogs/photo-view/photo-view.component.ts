import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService, Photo } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { FormInputField } from 'src/app/UI/components/form-field/form-field.component';
import { IconButton } from 'src/app/UI/components/icon/icon.component';

@Component({
  selector: 'app-photo-view',
  templateUrl: './photo-view.component.html',
  styles: [
  ]
})
export class PhotoViewComponent implements OnInit, AfterViewInit {

  public buttons: IconButton[] = [
    new IconButton("close")
      .setIconName("x")
      .setButtonColor("transparent")
      .setIconColor(""),
  ];

  public photo: Photo;
  public confirmDelete: boolean = false;

  @ViewChild("photoContainer") pc: ElementRef;
  public heightScale = 0;

  public form: FormGroup;
  public controls: FormInputField[];

  public editable: boolean = true;

  constructor(
    public _diagref: MatDialogRef<PhotoViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public cdRef: ChangeDetectorRef,

    public _form: FormService,
    public _data: DataService,
  ) { }

  ngOnInit(): void { 
    this.photo = this.data.photo;

    let asset = this._data.assets.value.find( a => a.photos.find(p => p.id == this.photo.id) != undefined )
    this.editable = asset.metrics.verified == undefined;

    this.form = this._form.initPhotoForm();
    this.controls = this._form.photoFormMap( this.form );

    this.form.get("name").setValue(this.photo.name);

    if (!this.editable){
      this.form.disable();
    }
  }

  ngAfterViewInit(): void {

    //  Full Scale Image
    let widthScale = this.pc.nativeElement.clientWidth / this.photo.width;
    this.heightScale = widthScale * this.photo.height;
  }


  headerEvent(event){
    if (event == "close"){
      this.close();
    }
  }

  deleteToggle() {
    this.confirmDelete = !this.confirmDelete;
  }

  delete() {
    this._data.photos.next( this._data.photos.value.filter(p => p.id != this.photo.id) );
    this.close();
  }

  save() {
    if (this._form._general.isValid(this.form)){
      this._data.photos.value.forEach(p => {
        if (p.id == this.photo.id){
          p.name = this.form.get("name").value;
        }
      });

      this.close();
    }
  }


  close() {
    this._diagref.close();
  }

}
