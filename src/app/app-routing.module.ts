import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path:'**',component:ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
