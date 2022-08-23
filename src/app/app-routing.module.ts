import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetDetailComponent } from './pages/asset-detail/asset-detail.component';
import { FacilityListComponent } from './pages/facility-list/facility-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RouteDetailComponent } from './pages/route-detail/route-detail.component';
import { RouteListComponent } from './pages/route-list/route-list.component';

const routes: Routes = [
  {
    path: "facilities",
    component: FacilityListComponent,
  },

  {
    path: "facility/:id",
    component: RouteListComponent,
  },


  {
    path: "route/:id",
    component: RouteDetailComponent,
  },

  {
    path: "asset/:id",
    component: AssetDetailComponent,
  },

  // {
  //   path: "grade/:id",
  //   component: CourseDetailComponent,
  // },

  {
    path: "lb",
    redirectTo: "facilities",
    pathMatch: "full"
  },

  {
    path: "",
    redirectTo: "facilities",
    pathMatch: "full"
  },

  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
