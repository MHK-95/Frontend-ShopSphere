import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '../security/UserDTO';
import { CartProductDTO, CartDTO } from '../cart/cartDTO';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private authUrl = 'http://localhost:8080/cart';

  addCart(userDTO: UserDTO, cartProductDTO: CartProductDTO): void {

    let httpOptions = {
      headers: new HttpHeaders({
        //Accept: 'text/plain',
        Authorization: 'Bearer ' + userDTO.jwt
      }),
      //responseType: 'text' as 'json',
    };

  this.http.post<any>(this.authUrl + "/" + userDTO.id + "/add", cartProductDTO, httpOptions)
      .subscribe(
        (data) => {  

          console.log(data);
          
        },
        (error) => {
          console.log(error);
        }
      );
  }

getCart(userid: number, jwt: string | null) {

    let httpOptions = {
      headers: new HttpHeaders({
        //Accept: 'text/plain',
        Authorization: 'Bearer ' + jwt
      }),
      //responseType: 'text' as 'json',
    };

    return this.http.get<CartDTO>(this.authUrl + "/" + userid, httpOptions);
  }


  deleteProduct(jwt: string | null, userid: number, productid: number): void {
    let httpOptions = {
      headers: new HttpHeaders({
        //Accept: 'text/plain',
        Authorization: 'Bearer ' + jwt
      }),
      //responseType: 'text' as 'json',
    };

    this.http.delete<any>(this.authUrl + "/" + userid + "/remove/" + productid, httpOptions)
      .subscribe(
        (data) => {

          console.log(data);
          
        },
        (error) => {
          console.log(error);
        }
      );
  }

  constructor(private http: HttpClient) {}
}
