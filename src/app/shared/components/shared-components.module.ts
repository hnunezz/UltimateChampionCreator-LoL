import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from './button/button.module';
import { InputTextModule } from './input-text/input-text.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule
  ],
  exports: [
    ButtonModule,
    InputTextModule
  ]
})
export class SharedComponentsModule { }
