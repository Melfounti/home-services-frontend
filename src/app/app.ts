import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Welcome } from './features/welcome/welcome';
@Component({
  selector: 'app-root',
  imports: [Welcome],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('home-services-frontend-temp');
}
