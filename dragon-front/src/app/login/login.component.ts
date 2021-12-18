import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  public loginForm: FormGroup;
  public isPasswordVisible = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public changePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  public login(): void {
    const formValue = this.loginForm.value;

    if (formValue.user && formValue.password) {
      this.authService.login(formValue.user, formValue.password).subscribe(() => {
        this.router.navigateByUrl('/home');
      });
    }
  }
}
