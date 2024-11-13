
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticService } from '../../services/authentic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authServe: AuthenticService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password:new FormControl ('', Validators.required)
    });
  }
  loginForm: FormGroup
  loginSubmit() {
    if (this.loginForm.valid) {
      this.authServe.login(this.loginForm.value).subscribe((res: any) => {
        this.router.navigate(['/dashboard'])
      },
        (error) => {
          console.log(error)
        })
    }
    else {
      console.log("Form i not valid")
    }
  }
}
