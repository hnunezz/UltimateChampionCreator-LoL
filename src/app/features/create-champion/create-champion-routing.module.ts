import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateChampionComponent } from './create-champion.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CreateChampionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateChampionRoutingModule { }
