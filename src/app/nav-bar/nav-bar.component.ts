import { Component } from '@angular/core';
import { createPopper } from '@popperjs/core';
import { Product } from '../model/product';
import { ProductService } from '../services/products.service';
import { NavigationEnd, Router } from '@angular/router';
import { UserDTO } from '../security/UserDTO';
import { AuthService } from '../auth.service';
import { LogoutService } from '../services/logout.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent {

  user: UserDTO = {id: -1, username: '', email: '', password: '', role: 'USER', jwt: ''};
  
  constructor(public authService: AuthService, public logoutService: LogoutService, private router: Router){
  }

  ngOnInit(): void {    
  }

  getUser(): UserDTO {
    return this.authService.user;
  }

  logoutButton() : void {
    this.logoutService.logout(this.getUser());
    this.router.navigate(['/home']);
  }

  logout(): void {
    this.authService.logout()    
  }
  
  isLoggedIn(): boolean {
    return (this.getUser().username.length > 0 || this.getUser().email.length > 0);
  }

  isAdmin(): boolean {
    return (this.getUser().role.toUpperCase() === "ADMIN");
  }



  /*
  constructor(
    private router: Router
  ) {
    this.router.events.subscribe({
      next: (routerEvent) => {
        if (routerEvent instanceof NavigationEnd) {
          console.log("router Event called")
          let id: string | null = localStorage.getItem('userId');
          console.log("navbar constructor")
          if (id) {
            this.userId = parseInt(id);
            this.loggedIn = true;
          }
        }
      }
    });
    let id: string | null = localStorage.getItem('userId');
    console.log("navbar constructor")
    if (id) {
      this.userId = parseInt(id);
      this.loggedIn = true;
    }
  }
  */

}
