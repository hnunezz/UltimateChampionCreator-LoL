import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';


@NgModule({
  declarations: [
    ButtonComponent
  ],
  imports: [
    CommonModule
  ], exports: [ButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ButtonModule { }
