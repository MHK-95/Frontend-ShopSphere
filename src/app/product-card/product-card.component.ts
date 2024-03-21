import { Component, Input } from '@angular/core';
import { Product } from '../model/product';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { AuthService } from '../auth.service';
import { UserDTO } from '../security/UserDTO';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input()
  product: Product = {id: 0, title: "", price: 0, description: "", category: "", image: "", rating: {rate: 0, count: 0}};

  
  createFilledStars(rating: number){
    return new Array(Math.round(rating)).fill(0).map((n, index) => index + 1);
  }

  createEmptyStars(rating: number){
    return new Array(5-Math.round(rating)).fill(0).map((n, index) => index + 1);
  }

  constructor(
    private router: Router,
    private cartService: CartService,
    public authService: AuthService
  ) { 
    
  }

  getUser(): UserDTO {
    return this.authService.user;
  }

  addToCart() {
    this.cartService.addCart(this.getUser(), {count: 1, productId: this.product.id});
  }

}
