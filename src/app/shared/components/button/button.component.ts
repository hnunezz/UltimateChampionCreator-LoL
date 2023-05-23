import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() public label: string;
  @Input() public styleClass: string
  @Output() public onClick: EventEmitter<any> = new EventEmitter<any>();

  public onClickEmitter(event: Event): void {
    this.onClick.emit(event);
  }
}
