import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from './auth';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  const token = auth.getToken();


if (token && !req.url.includes('/api/auth/')) {
    const cloned = req.clone({
      setHeaders:{  Authorization : `Bearer ${token}`}
    })
  return next(cloned);
  }
  
  
  return next(req);
};
