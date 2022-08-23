import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SelectAccountComponent } from './Accounts/dialogs/select-account/select-account.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { UIModule } from './UI/ui.module';
import { FacilityListComponent } from './pages/facility-list/facility-list.component';
import { FacilityListItemComponent } from './components/facility-list-item/facility-list-item.component';
import { RouteListComponent } from './pages/route-list/route-list.component';
import { RouteListItemComponent } from './components/route-list-item/route-list-item.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RouteDetailComponent } from './pages/route-detail/route-detail.component';
import { RouteCreateComponent } from './dialogs/route-create/route-create.component';
import { AssetListItemComponent } from './components/asset-list-item/asset-list-item.component';
import { AssetCreateComponent } from './dialogs/asset-create/asset-create.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { AssetDetailComponent } from './pages/asset-detail/asset-detail.component';
import { PhotoViewComponent } from './dialogs/photo-view/photo-view.component';

import { FacilityCreateComponent } from './dialogs/facility-create/facility-create.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,

    SelectAccountComponent,
    FacilityListComponent,
    FacilityListItemComponent,
    RouteListComponent,
    RouteListItemComponent,
    NotFoundComponent,
    RouteDetailComponent,
    FacilityCreateComponent,
    RouteCreateComponent,
    AssetListItemComponent,
    AssetCreateComponent,
    AssetDetailComponent,
    PhotoListComponent,
    PhotoViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UIModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
