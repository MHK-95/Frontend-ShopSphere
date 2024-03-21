import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

    private baseUrl:string = 'http://localhost:8080/products';
  
  
    constructor(private http:HttpClient) { }
      
    getAllProducts() {
      const productsUrl: string = this.baseUrl + '/all';
      return this.http.get<Product[]>(productsUrl);
    }

    getProductsByCategory(category: string) {
      const categoryUrl: string = this.baseUrl + '/categories/' + category;
      return this.http.get<Product[]>(categoryUrl);
    }

    getProduct(productId: number) {
      const productUrl: string = this.baseUrl + '/' + productId;
      return this.http.get<Product>(productUrl);
    }



}
