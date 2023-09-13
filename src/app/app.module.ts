import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { mainGuard } from './guards/guard.guard';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BGCLDirective } from './directives/bg-cl.directive'

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    HomePageComponent,
    BGCLDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [mainGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
