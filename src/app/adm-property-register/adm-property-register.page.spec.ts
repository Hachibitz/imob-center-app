import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmPropertyRegisterPage } from './adm-property-register.page';

describe('AdmPropertyRegisterPage', () => {
  let component: AdmPropertyRegisterPage;
  let fixture: ComponentFixture<AdmPropertyRegisterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmPropertyRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
