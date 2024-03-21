import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  jwt: string = '';

  users: Array<any> = [];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {
    this.router.events.subscribe({
      next: (routerEvent) => {
        if (routerEvent instanceof NavigationEnd) {
          this.jwt = decodeURI(routerEvent.url).split("/")[2];

          usersService.getAllUsers(this.jwt).subscribe({
            next: (data) => {
              this.users = data;
            },
            error: (data) => {
              console.log("Error for profile: " + data);
            }
          });
        }
      }
    });


  }

}
