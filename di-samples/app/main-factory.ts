import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

class Product {
    constructor(public title: string){}
}

class ProductService {
    getProduct(): Product{
        return new Product('iPhone 7');
    }
}

class MockProductService implements ProductService{
    getProduct(): Product{
        return new Product('Samsung 7');
    }
}

@Component({
    selector: 'product1',
    providers: [{
        provide: ProductService,
        useFactory: (isDev) => {
            if(isDev){
                return new MockProductService();
            }else{
                return new ProductService();
            }
        },
        deps: ["IS_DEV_ENVIRONMENT"]
    }],
    template: '{{product.title}}'
})
class Product1Component{
    product: Product;

    constructor(private productService: ProductService){
        this.product = productService.getProduct();
    }
}

@Component({
    selector: 'product2',
    template: '{{product.title}}',
    providers: [{
        provide: ProductService,
        useFactory: (isDev) => {
            if(isDev){
                return new MockProductService();
            }else{
                return new ProductService();
            }
        },
        deps: ["IS_DEV_ENVIRONMENT"]
    }],
})
class Product2Component {
    product: Product;

    constructor(private productService: ProductService){
        this.product = productService.getProduct();
    }
}

@Component({
    selector: 'app',
    template: `
        <h2>A root component hosts two products<br> provided by different services</h2>
        <product1></product1>
        <br>
        <product2></product2>
    `
})
class AppComponent{}

@NgModule({
    imports: [ BrowserModule ],
    providers: [ ProductService , {provide: "IS_DEV_ENVIRONMENT", useValue: false}],
    declarations: [ AppComponent, Product1Component, Product2Component ],
    bootstrap: [ AppComponent ]
})
class AppModule{}

platformBrowserDynamic().bootstrapModule(AppModule);
