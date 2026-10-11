import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateRequestPayload {
  title: string;
  description: string;
  category: string;
}

export interface ServiceRequestDto {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  customerName: string;
  createdAt: string;
}

export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

@Injectable({
  providedIn: 'root',
})
export class Request {
  private baseUrl = 'http://localhost:8080/api/requests';

  constructor(private http: HttpClient) {}

  create(payload: CreateRequestPayload): Observable<ServiceRequestDto> {
    return this.http.post<ServiceRequestDto>(this.baseUrl, payload);
  }

  getOpenRequests(page: number, size: number): Observable<PagedResponse<ServiceRequestDto>> {
    return this.http.get<PagedResponse<ServiceRequestDto>>(`${this.baseUrl}?page=${page}&size=${size}`);
  }
}
