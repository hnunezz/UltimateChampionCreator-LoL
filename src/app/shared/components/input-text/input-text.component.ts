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

  validateKey(e: KeyboardEvent): void {
    if (this.type.startsWith('t')) {
      if (e.keyCode > 47 && e.keyCode < 58) { e.preventDefault(); }
    } else {
      if (e.keyCode > 47 && e.keyCode < 58) { e.preventDefault(); }
    }
  }
}
