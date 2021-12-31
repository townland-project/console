import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-create-footer',
  templateUrl: './create-footer.component.html',
  styleUrls: ['./create-footer.component.scss']
})
export class CreateFooterComponent {

  @Input() backable: boolean = true;
  @Input() disabled: boolean = false;
  @Input() text: string = 'Next Step';

  @Output() back: EventEmitter<void> = new EventEmitter();
  @Output() next: EventEmitter<void> = new EventEmitter();

  constructor() { }

}
