
import { CommonModule } from '@angular/common';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ButtonModule,
    DialogModule,
  ],
  exports:[
    MainComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainModule { }
