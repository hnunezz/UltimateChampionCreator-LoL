import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() label: string;
  @Input() styleClass: string
  @Input() disable: boolean = false;
  @Output() onClick = new EventEmitter();

  onClickEmitter() {
    if (!this.disable) { this.onClick.emit(); }
  }
}
