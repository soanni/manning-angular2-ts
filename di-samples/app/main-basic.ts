import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import ProductComponent from './components/product';

@Component({
    selector: 'app',
    template: `<h1>Basic Dependency Injection Sample</h1>
                <di-product-page></di-product-page>`
})
class AppComponent{}

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent, ProductComponent],
    bootstrap: [AppComponent]
})
class AppModule{}

platformBrowserDynamic().bootstrapModule(AppModule);