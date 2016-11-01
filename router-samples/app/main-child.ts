import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import {HomeComponent} from './home.component';
import {ProductDetailParamDataComponent} from './product-child.component';
import {ProductDescriptionComponent} from './product-description.component';
import {SellerInfoComponent} from './seller.component';
import {_404Component} from './_404Component.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: 'product/:id', 
        component: ProductDetailParamDataComponent, 
        data: [{isProd: true}],
        children: [
            {path: '', component: ProductDescriptionComponent},
            {path: 'seller/:id', component: SellerInfoComponent}
        ]
    },
    {path: '**', component: _404Component}
];

@Component({
    selector: 'app',
    template: `
		<a [routerLink]="['/']">Home</a>
		<a [routerLink]="['/product',1234]">Product Details Param</a>
		<router-outlet></router-outlet>
	`
})
class AppComponent {
    constructor(private _router: Router){}
    navigateToProductDetail(){
        this._router.navigate(["/product"]);
    }
}

@NgModule({
    imports: [ BrowserModule, RouterModule.forRoot(routes)],
    declarations: [ AppComponent, HomeComponent, ProductDetailParamDataComponent, _404Component, ProductDescriptionComponent, SellerInfoComponent ],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
    bootstrap: [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);