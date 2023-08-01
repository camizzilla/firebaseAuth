import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IonTextarea } from '@ionic/angular';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.scss']
})
export class FoodItemComponent {

  @Input() value: String = '';
  @Input() isAutoGrow: boolean = true;
  @Input() isReadonly: boolean = true;
  @Input() isDisabled: boolean = true;

  @Output() deleteEvent = new EventEmitter<void>();
  @Output() saveValueEvent = new EventEmitter<string>();

  @ViewChild('foodItem') foodItem!: IonTextarea;

  constructor() {
    this.isReadonly = false;
    this.isDisabled = false;
    setTimeout(() => {this.foodItem.setFocus() }, 200);
  }

  save( ) {
    let value = this.foodItem.value;
    value && this.saveValueEvent.emit(value);
  }

  modify(){
    this.isReadonly = false;
    this.isDisabled = false;
    setTimeout(() => {this.foodItem.setFocus() }, 200);
  }

  delete(){
    this.deleteEvent.emit();
  }
}
