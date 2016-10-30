import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HomeComponent} from './home.component';
import {ProductDetailComponent} from './product-detail.component';
import {AppComponent} from './app.component';
import { routing } from './app.routing';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
	imports: [ BrowserModule, routing ],
	declarations: [ AppComponent, HomeComponent, ProductDetailComponent ],
	providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
	bootstrap: [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);