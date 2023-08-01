import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-food-diary',
  templateUrl: 'food-diary.page.html',
  styleUrls: ['food-diary.page.scss']
})
export class FoodDiaryPage {

  constructor( public authService: AuthService) {}

}
