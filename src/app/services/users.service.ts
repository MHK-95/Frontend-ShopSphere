import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '../security/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl:string = 'http://localhost:8080/auth/admin/users';
  
  
  constructor(private http:HttpClient) { }
    
  getAllUsers(jwt: string) {
    let httpOptions = {
      headers: new HttpHeaders({
        //Accept: 'text/plain',
        Authorization: 'Bearer ' + jwt
      }),
      //responseType: 'text' as 'json',
    };

    const userURL: string = this.baseUrl;

    return this.http.get<any[]>(userURL, httpOptions);
  }
}
