import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';


export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: 'CUSTOMER' | 'PROVIDER';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private baseUrl = 'http://localhost:8080/api/auth';
  private tokenKey = 'auth_token';

  isLoggedIn = signal<boolean>(this.hasToken());
  role = signal<string | null>(null);

  constructor(private http: HttpClient) {
    if (this.isTokenExpired()) {
      localStorage.removeItem(this.tokenKey);
    } else {
      this.isLoggedIn.set(true);
      this.role.set(this.decodePayload()?.role ?? null);
    }
  }

 register(request: RegisterRequest): Observable<string> {
    return this.http.post(`${this.baseUrl}/register`, request, { responseType: 'text' });
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, request).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.token);
        this.isLoggedIn.set(true);
        this.role.set(this.decodePayload()?.role ?? null);
      })
    );
  }
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedIn.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private hasToken(): boolean {
    return this.getToken() !== null;
  }

  isTokenExpired(): boolean {
    const payload = this.decodePayload();
    if (!payload?.exp) return true;
    return payload.exp * 1000 < Date.now();
  }

  private decodePayload(): { role?: string; exp?: number } | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch {
      return null;
    }
  }
}
