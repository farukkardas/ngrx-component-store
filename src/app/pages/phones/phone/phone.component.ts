import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Phone } from 'src/app/models/phone';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {
  faTrash = faTrash;
  @Input() phone?: Phone;
  // Output for remove
  @Output() remove = new EventEmitter<number>();
  @Output() update = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  removePush(id: number) {
    this.remove.emit(id);
  }

  updatePush(id: number) {
    this.update.emit(id);
  }


}
