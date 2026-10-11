import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { Auth } from "../../core/auth";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  email = '';
  password = '';
  errorMessage = signal('');

  constructor(private auth: Auth, private router: Router) {}

  onSubmit(): void {
    this.errorMessage.set('');
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(['/profile']),
     error: (err) => {
  if (err.status === 401) {
    this.errorMessage.set('Invalid email or password');
  } else if (err.status === 0) {
    this.errorMessage.set('Cannot reach the server. Is the backend running?');
  } else {
    this.errorMessage.set('Something went wrong (status ' + err.status + ')');
  }
}
    });
  }
}