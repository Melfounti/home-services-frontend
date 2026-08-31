import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../core/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  email = '';
  password = '';
  name = '';
  role: 'CUSTOMER' | 'PROVIDER' = 'CUSTOMER';
  errorMessage = signal('');

  constructor(private auth: Auth, private router: Router) {}

  onSubmit(): void {
    this.errorMessage.set('');
    this.auth.register({ email: this.email, password: this.password, name: this.name, role: this.role }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => {
        if (err.status === 409) {
          this.errorMessage.set('Email already registered');
        } else {
          this.errorMessage.set('Registration failed');
        }
      }
    });
  }
}