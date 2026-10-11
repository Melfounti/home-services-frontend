import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Request } from '../../core/request';

@Component({
  selector: 'app-create-request',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-request.html',
  styleUrl: './create-request.scss'
})
export class CreateRequest {
  title = '';
  description = '';
  category = '';
  errorMessage = signal('');
  isSubmitting = signal(false);

  constructor(private requestService: Request, private router: Router) {}

  onSubmit(): void {
    this.errorMessage.set('');
    this.isSubmitting.set(true);

    this.requestService.create({ title: this.title, description: this.description, category: this.category }).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.router.navigate(['/profile']);
      },
      error: () => {
        this.isSubmitting.set(false);
        this.errorMessage.set('Failed to create request. Please try again.');
      }
    });
  }
}