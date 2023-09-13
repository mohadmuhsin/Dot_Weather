import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { mainGuard } from './guards/guard.guard';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
const routes: Routes = [
  { path: '', canActivate: [mainGuard], component: HomePageComponent },
  { path: 'login', canActivate: [mainGuard], component: LoginPageComponent },
  { path: 'signUp', canActivate: [mainGuard], component: SignUpPageComponent },
  {path:'**',component:ErrorPageComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
