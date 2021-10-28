import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

/** 配置 angular i18n **/
// import { registerLocaleData } from '@angular/common';
// import zh from '@angular/common/locales/zh';
// registerLocaleData(zh);

import { SessionService } from './services/session.service';

import { InputNumberDirective } from './directives/input-number.directive';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';

import { HomeComponent } from './views/home/home.component';

const BaseRouter = (window as any).__POWERED_BY_QIANKUN__? '/micro/angular2': '/';

@NgModule({
  declarations: [
    InputNumberDirective,
    AppComponent,
    LayoutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: BaseRouter },
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
