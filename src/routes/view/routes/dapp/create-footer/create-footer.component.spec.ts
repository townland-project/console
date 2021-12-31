import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFooterComponent } from './create-footer.component';

describe('CreateFooterComponent', () => {
  let component: CreateFooterComponent;
  let fixture: ComponentFixture<CreateFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
