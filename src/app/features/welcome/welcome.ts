import { Component, OnInit, signal } from '@angular/core';
import { Api } from '../../core/api';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss'
})
export class Welcome implements OnInit {
  message = signal('Loading...');

  constructor(private api: Api) {}

  ngOnInit(): void {
    this.api.getWelcomeMessage().subscribe({
      next: (msg) => this.message.set(msg),
      error: () => this.message.set('Failed to load message from backend.')
    });
  }
}