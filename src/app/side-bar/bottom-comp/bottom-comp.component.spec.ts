import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomCompComponent } from './bottom-comp.component';

describe('BottomCompComponent', () => {
  let component: BottomCompComponent;
  let fixture: ComponentFixture<BottomCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomCompComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BottomCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
