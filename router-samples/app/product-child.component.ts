import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router'

@Component({
    selector: 'product',
    template: `<div class="product">
                <h1 class="product">Product Details Component: {{productId}}</h1>
                <router-outlet></router-outlet>
                <p><a [routerLink]="['./seller',5678]">Seller Info</a></p>
               </div>`,
    styles: ['.product {background:  cyan}']
})
export class ProductDetailParamDataComponent {
    productId: string;
    isProdEnvironment: string;
    constructor(route: ActivatedRoute){
        this.productId = route.snapshot.params['id'];
        this.isProdEnvironment = route.snapshot.data[0]['isProd'];
        console.log("this.isProdEnvironment = " + this.isProdEnvironment);
        //this.route.params.subscribe(
        //    params => this.productId = params['id']
        //);
    }
}
