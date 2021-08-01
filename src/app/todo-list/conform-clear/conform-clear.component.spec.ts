import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConformClearComponent } from './conform-clear.component';

describe('ConformClearComponent', () => {
  let component: ConformClearComponent;
  let fixture: ComponentFixture<ConformClearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConformClearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConformClearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
