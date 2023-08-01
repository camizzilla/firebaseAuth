import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FoodDiaryPage } from './food-diary.page';
import { FoodDiaryPageRoutingModule } from './food-diary-routing.module';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DailyMealComponent } from './components/daily-meal/daily-meal.component';
import { FoodItemComponent } from './components/food-item/food-item.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FoodDiaryPageRoutingModule,
  ],
  declarations: [
    FoodDiaryPage,
    DailyMealComponent,
    FoodItemComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FoodDiaryPageModule {}
