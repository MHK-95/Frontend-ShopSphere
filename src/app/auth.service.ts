import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { UserDTO } from './security/UserDTO';


@Injectable({providedIn: 'root'})
export class AuthService {

  user: UserDTO = {id: -1, username: '', email: '', password: '', role: 'USER', jwt: ''};

  userChange: Subject<UserDTO> = new Subject<UserDTO>();

  constructor(){
    this.userChange.subscribe(value =>{
      console.log("userChange.subscribe",value)
      this.user = value
    })
  }

  login(user: UserDTO){      
    this.userChange.next(user)
  }

  logout(){
    this.userChange.next({id: -1, username: '', email: '', password: '', role: 'USER', jwt: ''})
  }     
}
