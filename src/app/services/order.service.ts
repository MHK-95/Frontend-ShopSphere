import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '../security/UserDTO';
import { CartProductDTO } from '../cart/cartDTO';
import { OrderDTO } from "../order/orderDTO";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private authUrl = 'http://localhost:8080/orders';

  getOrder(jwt: string | null, userid: number | null) {

    let httpOptions = {
      headers: new HttpHeaders({
        //Accept: 'text/plain',
        Authorization: 'Bearer ' + jwt
      }),
      //responseType: 'text' as 'json',
    };

    return this.http.get<OrderDTO[]>(this.authUrl + "/" + userid, httpOptions);
  }

  createOrder(jwt: string | null, userid: number | null, orderDTO: OrderDTO) {

    let httpOptions = {
      headers: new HttpHeaders({
        //Accept: 'text/plain',
        Authorization: 'Bearer ' + jwt
      }),
      //responseType: 'text' as 'json',
    };

    return this.http.post<any>(this.authUrl + "/" + userid, orderDTO, httpOptions);
  }

  

  constructor(private http: HttpClient) {}
}
