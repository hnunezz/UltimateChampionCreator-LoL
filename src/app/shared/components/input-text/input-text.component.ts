import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent {

  @Input() placeholder: string;
  @Input() type: string = 'text';
  @Input() model: string = '';

  @Output() modelChange: EventEmitter<string> = new EventEmitter<string>();

}
