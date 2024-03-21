import { Component } from '@angular/core';
import { UserDTO } from '../UserDTO';
import { RegistrationService } from 'src/app/services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent {

  constructor(private registrationService: RegistrationService,
    private router: Router
    ){};


  public user: UserDTO = {id: -1, username: '', email: '', password: '', role: 'USER', jwt: ''};

  onSubmit() {
    this.registrationService.register(this.user);
    this.router.navigate(['/authentication']);
  }

}
