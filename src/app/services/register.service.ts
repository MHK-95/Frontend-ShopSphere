import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, catchError, map } from 'rxjs';
import { LoginDTO } from '../security/LoginDTO';
import { UserDTO } from '../security/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private authUrl = 'http://localhost:8080/auth';

  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'text/plain',
    }),
    responseType: 'text' as 'json',
  };


  register(userDTO: UserDTO): void {

    this.http
      .post<any>(this.authUrl + '/register', userDTO)//, this.httpOptions)
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
