import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashFileComponent } from './dash-file.component';

describe('DashFileComponent', () => {
  let component: DashFileComponent;
  let fixture: ComponentFixture<DashFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
