import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from './button/button.module';
import { InputTextModule } from './input-text/input-text.module';
import { TriangleComponent } from './layout/triangle/triangle.component';



@NgModule({
  declarations: [
    TriangleComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule
  ],
  exports: [
    ButtonModule,
    InputTextModule,
    TriangleComponent
  ]
})
export class SharedComponentsModule { }
