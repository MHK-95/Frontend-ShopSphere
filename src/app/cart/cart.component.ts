import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ProductService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { CartDTO } from './cartDTO';
import { Product } from '../model/product';
import { UserDTO } from '../security/UserDTO';
import { AuthService } from '../auth.service';
import { OrderDTO } from '../order/orderDTO';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})


export class CartComponent {

  cartDTO: CartDTO = {id: -1, userid: -1, products: []};
  cartProducts: Product[] = [];

  constructor(
    public router: Router,
    public cartService: CartService,
    public productService: ProductService,
    public authService: AuthService,
    public orderService: OrderService
  ) { 

    this.getMyCart();
    
  }

  getMyCart() {
  this.router.events.subscribe({
    next: (routerEvent) => {
      if (routerEvent instanceof NavigationEnd) {
        this.cartService.getCart(Number(localStorage.getItem("userid")), localStorage.getItem("jwt")).subscribe({
          next: cart => {
            this.cartDTO = cart;
            for (let i: number = 0; i < this.cartDTO.products.length; i++) {
              //console.log("test1");

              //let currentProduct: Product = {id: 0, title: "", price: 0, description: "", category: "", image: "", rating: {rate: 0, count: 0}};

              this.productService.getProduct(this.cartDTO.products[i].productId).subscribe({
                next: (data) => {
                  console.log("test2: " + data.title + "Name: " + data.description);
                  this.cartProducts.push(data);
                  //currentProduct = product;

                },
                error: (error) => {
                  console.log("Error: " + error);
                }
              });
            //this.cartProducts.push(currentProduct);
            }
          }

        });
      }
    }
  });
}

  deleteProduct(productid: number) {
    this.cartService.deleteProduct(localStorage.getItem("jwt"), Number(localStorage.getItem("userid")), productid);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(["cart"])});  }

  getUser(): UserDTO {
    return this.authService.user;
  }

  createOrder(): void {
    let newOrder: OrderDTO = {id: -1, delivered: true, userId: this.cartDTO.userid, products: []};

    for (let i = 0; i < this.cartDTO.products.length; i++) {
      newOrder.products.push({count: this.cartDTO.products[i].count, productId: this.cartDTO.products[i].productId});
    }

    this.orderService.createOrder(localStorage.getItem("jwt"), Number(localStorage.getItem("userid")), newOrder).subscribe({
      next: (data) => {
        console.log("Order Data " + data)
        },
      error: (error) => {
        console.log("Order Data " + error)
      }
      });

    this.cartProducts.forEach(x => this.cartService.deleteProduct(localStorage.getItem("jwt"), Number(localStorage.getItem("userid")), x.id));
    this.router.navigate(['/order']);
    
  }

}
