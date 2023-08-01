import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { FoodDiaryPage } from './food-diary.page';

describe('Tab1Page', () => {
  let component: FoodDiaryPage;
  let fixture: ComponentFixture<FoodDiaryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodDiaryPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FoodDiaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
