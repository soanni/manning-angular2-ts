import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import {HomeComponent} from './home.component';
import {ProductDetailComponent} from './product-detail.component';
import {_404Component} from './_404Component.component';
import {LoginGuard} from './guards/login.guard';
import {UnsavedChangesGuard} from './guards/unsaved-changes.guard';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'product', component: ProductDetailComponent, canActivate:[LoginGuard], canDeactivate:[UnsavedChangesGuard]},
    {path: '**', component: _404Component}
];

@Component({
	selector: 'app',
	template: `
		<a [routerLink]="['/']">Home</a>
		<a [routerLink]="['/product']">Product Details</a>
		<router-outlet></router-outlet>
	`
})
class AppComponent {}

@NgModule({
	imports: [ BrowserModule, RouterModule.forRoot(routes)],
	declarations: [ AppComponent, HomeComponent, ProductDetailComponent, _404Component ],
	providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, LoginGuard, UnsavedChangesGuard]
	bootstrap: [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);