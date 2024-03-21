import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ResolveEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/products.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  category: string = '';

  products: Array<Product> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  ) {

    this.router.events.subscribe({
      next: (routerEvent) => {
        if (routerEvent instanceof NavigationEnd) {
          this.category = decodeURI(routerEvent.url).split("/")[2];
          if (this.category === "all products") {

            productService.getAllProducts().subscribe({
              next: (data) => {
                console.log(data);
                this.products = data;
              },
              error: data => {
                console.error("Error: " + data);
              }
            });

          } else {

            productService.getProductsByCategory(this.category).subscribe({
              next: (data) => {
                console.log(data);
                this.products = data;
              },
              error: data => {
                console.error("Error: " + data);
              }
          });

        }
        }
      }
    });
  }
  
}
