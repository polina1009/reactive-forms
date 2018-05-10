import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcularHistoryComponent } from './ocular-history.component';

describe('OcularHistoryComponent', () => {
  let component: OcularHistoryComponent;
  let fixture: ComponentFixture<OcularHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcularHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcularHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
