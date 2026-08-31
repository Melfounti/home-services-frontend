import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UserProfile {
  email: string;
  name: string;
  role: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {
  profile = signal<UserProfile | null>(null);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<UserProfile>('http://localhost:8080/api/users/me').subscribe({
      next: (data) => this.profile.set(data)
    });
  }
}