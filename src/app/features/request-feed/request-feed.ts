import { Component, OnInit, signal } from '@angular/core';
import { Request, ServiceRequestDto, PagedResponse } from '../../core/request';

@Component({
  selector: 'app-request-feed',
  standalone: true,
  templateUrl: './request-feed.html',
  styleUrl: './request-feed.scss'
})
export class RequestFeed implements OnInit {
  requests = signal<ServiceRequestDto[]>([]);
  currentPage = signal(0);
  totalPages = signal(0);
  isLoading = signal(true);
  pageSize = 10;

  constructor(private requestService: Request) {}

  ngOnInit(): void {
    this.loadPage(0);
  }

  loadPage(page: number): void {
    this.isLoading.set(true);
    this.requestService.getOpenRequests(page, this.pageSize).subscribe({
      next: (response: PagedResponse<ServiceRequestDto>) => {
        this.requests.set(response.content);
        this.currentPage.set(response.number);
        this.totalPages.set(response.totalPages);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages() - 1) {
      this.loadPage(this.currentPage() + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage() > 0) {
      this.loadPage(this.currentPage() - 1);
    }
  }
}