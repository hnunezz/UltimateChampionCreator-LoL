import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CreateChampionRoutingModule } from './create-champion-routing.module';
import { CreateChampionComponent } from './create-champion.component';
import { ButtonModule } from 'src/app/shared/components/button/button.module';

import { VirtualScrollerModule } from 'primeng/virtualscroller'
import {DialogModule} from 'primeng/dialog';
import { SharedModule } from 'primeng/api';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { ChampionListComponent } from './champion-list/champion-list.component';

@NgModule({
  declarations: [CreateChampionComponent, ChampionListComponent],
  imports: [
    CommonModule,
    CreateChampionRoutingModule,
    FormsModule,
    VirtualScrollerModule,
    DialogModule,
    SharedComponentsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateChampionModule { }
