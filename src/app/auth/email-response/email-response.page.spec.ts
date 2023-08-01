import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { EmailResponsePage } from './email-response.page';

describe('EmailResponsePage', () => {
  let component: EmailResponsePage;
  let fixture: ComponentFixture<EmailResponsePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EmailResponsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
