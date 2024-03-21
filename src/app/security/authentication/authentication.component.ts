import { Component } from '@angular/core';
import { UserDTO } from '../UserDTO';
import { LoginService } from '../../services/login.service';
import { LoginDTO } from '../LoginDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {

  constructor(private loginService: LoginService, private router: Router){};

  public loginDTO: LoginDTO = {usernameOrEmail: '', password: ''};


  onSubmit() {
    this.loginService.login(this.loginDTO);
    this.router.navigate(['/home']);
  }

}
