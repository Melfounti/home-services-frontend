import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Register } from './features/register/register';
import { Profile } from './features/profile/profile';
import { Welcome } from './features/welcome/welcome';
import { CreateRequest } from './features/create-request/create-request';
import { RequestFeed } from './features/request-feed/request-feed';
import { authGuard, roleGuard } from './core/role-guard';

export const routes: Routes = [
  { path: '', component: Welcome },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'create-request', component: CreateRequest, canActivate: [roleGuard('CUSTOMER')] },
  { path: 'requests', component: RequestFeed, canActivate: [roleGuard('PROVIDER')] }
];