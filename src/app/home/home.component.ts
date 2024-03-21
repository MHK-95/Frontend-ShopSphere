import { Component } from '@angular/core';
import { ProductService } from '../services/products.service';
import { Product } from '../model/product';
import { createPopper } from '@popperjs/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  allProducts: Array<Product> = [];
  first8Products: Array<Product> = [];

  constructor(private pService: ProductService) {
    pService.getAllProducts().subscribe({
      next: (data) => {
        // We want the 8 random products for the home page.
        this.shuffleArray(data);
        this.allProducts = data;
        for (let i = 0; i < 8; i++) {
          this.first8Products[i] = data[i];
        }
      },
      error: data => {
        console.error("Error: " + data);
      }
    });
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
  

}
