import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDestinationComponent } from './manage-destination.component';

describe('ManageDestinationComponent', () => {
  let component: ManageDestinationComponent;
  let fixture: ComponentFixture<ManageDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageDestinationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
