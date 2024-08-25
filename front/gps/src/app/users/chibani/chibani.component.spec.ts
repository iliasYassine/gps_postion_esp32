import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChibaniComponent } from './chibani.component';

describe('ChibaniComponent', () => {
  let component: ChibaniComponent;
  let fixture: ComponentFixture<ChibaniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChibaniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChibaniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
