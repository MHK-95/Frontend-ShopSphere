import { Injectable } from '@angular/core';
import { LoginDTO } from '../security/LoginDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { UserDTO } from '../security/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  private authUrl = 'http://localhost:8080/auth/logout';



  logout(userDTO: UserDTO): void {

    
  let httpOptions = {
    headers: new HttpHeaders({
      Accept: 'text/plain',
      Authorization: 'Bearer ' + userDTO.jwt
    }),
    responseType: 'text' as 'json',
  };

    this.http
      .post<any>(this.authUrl, { headers: httpOptions })
      .subscribe(
        (data) => {
          this.auth.logout();
          localStorage.removeItem("userid");
          localStorage.removeItem("jwt");
        },
        (error) => {
          console.log(error);
        }
      );
      
  }

  constructor(private http: HttpClient, public auth: AuthService) {}
}
