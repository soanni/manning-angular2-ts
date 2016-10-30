import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router'

@Component({
    selector: 'product',
    template: `<h1 class="product">Product Details Component: {{productId}}</h1>`,
    styles: ['.product {background:  cyan}']
})
export class ProductDetailParamComponent {
    productId: String;
    constructor(route: ActivatedRoute){
        this.productId = route.snapshot.params['id'];
        //this.route.params.subscribe(
        //    params => this.productId = params['id']
        //);
    }
}
