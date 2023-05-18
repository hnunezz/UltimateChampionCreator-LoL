import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CreateChampionRoutingModule } from './create-champion-routing.module';
import { CreateChampionComponent } from './create-champion.component';
import { ButtonModule } from 'src/app/shared/components/button/button.module';

import { VirtualScrollerModule } from 'primeng/virtualscroller'

@NgModule({
  declarations: [CreateChampionComponent],
  imports: [
    CommonModule,
    CreateChampionRoutingModule,
    ButtonModule,
    FormsModule,
    VirtualScrollerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateChampionModule { }
