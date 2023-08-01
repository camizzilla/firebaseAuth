import { Component, Input, OnInit, ViewChild } from '@angular/core';

interface FoodItem {
  value: string;
}

@Component({
  selector: 'app-daily-meal',
  templateUrl: './daily-meal.component.html',
  styleUrls: ['./daily-meal.component.scss'],
})
export class DailyMealComponent  implements OnInit {

  @Input() title!: String;
  @Input() value: String = '';
  @Input() isAutoGrow: boolean = true;
  @Input() isReadonly: boolean = true;
  @Input() isDisabled: boolean = true;

  foodItems: FoodItem[] = [];

  constructor() {
  }

  ngOnInit() {

  }

  addFoodItem() {
    this.foodItems.push({ value: '' })
  }

  removeFoodItem( i: number ) {
    this.foodItems.splice(i, 1);
  }

  saveFoodItem( value: string, i: number ){
    this.isReadonly = true;
    this.foodItems[i].value = value;
    console.log(this.foodItems)
  }

}
