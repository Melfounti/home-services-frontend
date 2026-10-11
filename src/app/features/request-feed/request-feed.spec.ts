import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFeed } from './request-feed';

describe('RequestFeed', () => {
  let component: RequestFeed;
  let fixture: ComponentFixture<RequestFeed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestFeed]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestFeed);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
