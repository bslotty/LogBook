import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Account } from '../Accounts/services/account.service';
import { DialogService } from '../UI/services/dialog.service';


function genID(): number {
  return Math.round(Math.random() * 1000)
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  public manufacturers: BehaviorSubject<Manufacturer[]> = new BehaviorSubject<Manufacturer[]>([]);

  public facilities: BehaviorSubject<Facility[]> = new BehaviorSubject<Facility[]>([]);
  public routes: BehaviorSubject<Route[]>        = new BehaviorSubject<Route[]>([]);
  public assets: BehaviorSubject<Asset[]>        = new BehaviorSubject<Asset[]>([]);
  public photos: BehaviorSubject<Photo[]>        = new BehaviorSubject<Photo[]>([]);

  private __facilities    = require("./data/facilities.json");
  private __routes        = require("./data/routes.json");
  private __assets        = require("./data/assets.json");
  private __manufacturers = require("./data/manufacturers.json");

  private id: number;

  constructor(
    public _dialog: DialogService,
    public route  : ActivatedRoute,
    public router : Router,
  ) {


        
    //  Init Temp Data
    this.manufacturers.next( this.__manufacturers.map( m => {
      return new Manufacturer(m.id).setFullName(m.full_name).setShortName(m.short_name)
    }));

    this.assets.next( this.__assets.map(a => {
      return new Asset(a.id)
      .setName(a.name)
      .setSerialNumber(a.serial_no)
      .setManufacturer( this.manufacturers.value.find(m => m?.id == a.manufacturer_id))
      .setRoute( getRandomInt(300) )
    }));

    this.routes.next( this.__routes.map( r => {
      return new Route(r.id)
      .setName(r.name)
      .setAssets( this.assets.value.filter(a => a.route_id == r.id))
      .setFacility( getRandomInt(25) );
    }));

    this.facilities.next(this.__facilities.map(f => {
      return new Facility(f.id)
        .setName(f.name)
        .setAddress(f.address)
        .setCity(f.city)
        .setState(f.state)
        .setZip(f.zip)
        .setRoutes( this.routes.value.filter( r => r.facility_id == f.id))
    }));

  }

  notSetRedirect() {
    this.router.navigate(["/"]);
  }

  getNewID() {
    return genID();
  }

  //  Route Params Workaround
  setID(id: number){
    this.id = id;
  }



  openCreateFacilityDialog() {
    let f = new Facility(genID());

    this._dialog.settings.data.facility = f;
    this._dialog.open("createFacility").subscribe(d => {  })
  }

  createFacility(facility: Facility) {
    this.facilities.value.push(facility);
  }

  getFacilityByID(id: number): Facility | undefined {
    return this.facilities.value.find(f => f.id == id);
  }




  openCreateRouteDialog() {
    let r = new Route(genID());

    this._dialog.settings.data.route = r;
    this._dialog.open("createRoute").subscribe(d => {  })
  }

  createRoute(route: Route) {
    route.setFacility(this.id);
    let list = this.routes.value;
    list.push(route);
    this.routes.next(list);
  }

  getRouteByID(id: number): Route | undefined {
    return this.routes.value.find(f => f.id == id);
  }



  openCreateAssetDialog() {
    let a = new Asset( genID()+"" );

    this._dialog.settings.data.asset = a;
    this._dialog.open("createAsset").subscribe(d => { })
  }


  createAsset(asset: Asset) {

    asset.setRoute(this.id);
    let list = this.assets.value;
    list.push(asset);
    this.assets.next(list);
  }


  getAssetByID(id: string): Asset | undefined {
    return this.assets.value.find(f => f.id == id);
  }



  createPhoto(photo: Photo) {
    this.photos.value.push(photo);
  }
}





export class Facility {
  id     : number;
  name   : string;
  address: string;
  city   : string;
  state  : string;
  zip    : number;

  routes: Route[] = [];

  constructor(id: number) {
    this.id = id;
    return this;
  }

  setName(name: string) {
    this.name = name;
    return this;
  }

  setAddress(address: string) {
    this.address = address;
    return this;
  }

  setCity(city: string) {
    this.city = city;
    return this;
  }

  setState(state: string) {
    this.state = state;
    return this;
  }

  setZip(zip: number) {
    this.zip = zip;
    return this;
  }



  addRoute(route: Route){
    this.routes.push(route);
    return this;
  }

  setRoutes(routes: Route[]){
    routes.forEach( r => {
      this.routes.push(r);
    });
    return this;
  }


}



export class Route {
  id         : number;
  facility_id: number;
  name       : string;

  assets: Asset[] = [];

  constructor(id: number) {
    this.id = id;
    return this;
  }

  setName(name: string) {
    this.name = name;
    return this;
  }

  setAssets(assets: Asset[]){
    assets.forEach(a => this.assets.push(a));
    return this;
  }

  setFacility(id: number){
    this.facility_id = id;
    return this;
  }
}





// export class Assignment {
//   account : Account;
//   facility: Facility;
// }





export class Asset {
  id          : string;
  route_id    : number;
  name        : string;
  serialNo    : string;
  manufacturer: Manufacturer;

  metrics: Metric;
  photos : Photo[];

  constructor(id: string) {
    this.id      = id;
    this.metrics = new Metric().setCreated();

    this.photos = [];
    return this;
  }

  setName(name: string) {
    this.name = name;
    return this;
  }

  setSerialNumber(serialNo: string) {
    this.serialNo = serialNo;
    return this;
  }

  setManufacturer(manufacturer: Manufacturer) {
    this.manufacturer = manufacturer;
    return this;
  }

  setRoute(id: number){
    this.route_id = id;
    return this;
  }

  addPhoto(p: Photo){
    this.photos.push(p);
    return this;
  }
}






export class Photo {
  id    : number;
  name  : string;
  base64: string;
  img;

  size: number;
  type: string;

  width: number;
  height: number;

  constructor(id: number) {
    this.id = id;
    return this;
  }

  setName(name: string) {
    this.name = name;
    return this;
  }

  setBase64(base64: string) {
    this.img     = new Image()
    this.base64  = base64;
    this.img.src = this.base64;
    setTimeout(() => {
      this.setDimensions(this.img.naturalWidth, this.img.naturalHeight );
    });
    return this;
  }

  setSize(bytes: number) {
    this.size = bytes;
    return this;
  }

  setType(mimeType: string) {
    this.type = mimeType;
    return this;
  }

  setDimensions(width: number, height: number){
    this.width = width;
    this.height = height;
    return this;
  }

}






export class Metric {
  created  : Date;
  modified : Date;
  completed: Date;
  verified : Date;

  constructor() { }

  setCreated() {
    this.created = new Date();
    return this;
  }

  setModified() {
    this.modified = new Date();
    return this;
  }

  setCompleted() {
    this.completed = new Date();
    return this;
  }

  setVerified() {
    this.verified = new Date();
    return this;
  }
}







export class Manufacturer {
  id        : number;
  full_name : string;
  short_name: string;

  constructor(id: number) {
    this.id = id;
  }

  setFullName(name: string) {
    this.full_name = name;
    return this;
  }

  setShortName(name: string) {
    this.short_name = name;
    return this;
  }
}