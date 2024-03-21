import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router, RouterEvent } from '@angular/router';
import { ProductService } from '../services/products.service';
import { Product } from '../model/product';
import { CartService } from '../services/cart.service';
import { UserDTO } from '../security/UserDTO';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  productId: number = -1;
  category: string = '';
  product: Product = {id: 0, title: "", price: 0, description: "", category: "", image: "", rating: {rate: 0, count: 0}};
  random4Products: Array<Product> = [];


  constructor(
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService
  ) {
    // get product id based on router event
    this.router.events.subscribe({
      next: (routerEvent) => {
        if (routerEvent instanceof NavigationEnd) {
          this.productId = Number(decodeURI(routerEvent.url).split("/")[2]);

          // get product based on product id
          productService.getProduct(this.productId).subscribe({
            next: (product) => {
              this.product = product;

              // get a list of products in the same category
              productService.getProductsByCategory(product.category).subscribe({
                next: (data) => {
                  let newData: Array<Product> = data.filter(x => (x.id !== this.productId));
                  this.shuffleArray(newData);
                  for (let i = 0; i < 4 && i < newData.length; i++) {
                    this.random4Products[i] = newData[i];
                  }
                }
              });
            }
          });
        }
      }   
    })

  }

  // O(n) array Suffler function
  private shuffleArray(array: Array<any>) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
  }

  createFilledStars(rating: number){
    return new Array(Math.round(rating)).fill(0).map((n, index) => index + 1);
  }

  createEmptyStars(rating: number){
    return new Array(5-Math.round(rating)).fill(0).map((n, index) => index + 1);
  }

  getUser(): UserDTO {
    return this.authService.user;
  }

  addToCart() {
    this.cartService.addCart(this.getUser(), {count: 1, productId: this.product.id});
  }


}
