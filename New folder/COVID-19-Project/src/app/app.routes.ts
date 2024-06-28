import { Routes } from '@angular/router';
import { ResultComponent } from './view/result/result.component';
import { HomeComponent } from './view/home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'result', component: ResultComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
