import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/products.service';
import { AuthService } from '../auth.service';
import { OrderService } from '../services/order.service';
import { OrderDTO } from './orderDTO';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  ordersDTO: OrderDTO[] = [];
  orderStrings: string[] = [];


  constructor(
    public router: Router,
    public cartService: CartService,
    public productService: ProductService,
    public authService: AuthService,
    public orderService: OrderService
  ) { 


        // get product id based on router event
        this.router.events.subscribe({
          next: (routerEvent) => {
            if (routerEvent instanceof NavigationEnd) {
    
              orderService.getOrder(localStorage.getItem("jwt"), Number(localStorage.getItem("userid"))).subscribe({
                next: (orders) => {
                  this.ordersDTO = orders;
                  for (let i = 0; i <orders.length; i++) {
                    let pString: string = '[';
                    for (let x = 0; x < orders[i].products.length; x++){
                      pString = pString + "{product ID: " + orders[i].products[x].productId + ", Count: " + orders[i].products[x].count + "}" + ", " ;
                    }
                    pString = pString + "]";
                    this.orderStrings[i] = "Order ID: " + this.ordersDTO[i].id + ", User ID: " + this.ordersDTO[i].userId + ", Products: " + pString;
                  }
                }
              });
            }
          }   
        })
  }

}
