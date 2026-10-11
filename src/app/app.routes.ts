import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Register } from './features/register/register';
import { Profile } from './features/profile/profile';
import { Welcome } from './features/welcome/welcome';
import { CreateRequest } from './features/create-request/create-request';
import { RequestFeed } from './features/request-feed/request-feed';

export const routes: Routes = [
  { path: '', component: Welcome },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
    { path: 'create-request', component: CreateRequest },
  { path: 'requests', component: RequestFeed },
  { path: 'profile', component: Profile }
];