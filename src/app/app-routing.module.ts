import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './features/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    loadChildren: () => import('../app/features/create-champion/create-champion.module').then(m => m.CreateChampionModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'abc',
    component: MainComponent,
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
