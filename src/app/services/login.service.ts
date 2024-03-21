import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, catchError, map } from 'rxjs';
import { LoginDTO } from '../security/LoginDTO';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private authUrl = 'http://localhost:8080/auth';


  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'text/plain',
    }),
    responseType: 'text' as 'json',
  };


  login(loginDTO: LoginDTO): void {

    this.http
      .post<any>(this.authUrl + '/login', loginDTO)//, this.httpOptions)
      .subscribe(
        (data) => {
          localStorage.setItem("userid", data.id);
          localStorage.setItem("jwt", data.jwt);
          this.auth.login(data);
        },
        (error) => {
          console.log(error);
        }
      );
      
  }

  constructor(private http: HttpClient, public auth: AuthService) {}
}
