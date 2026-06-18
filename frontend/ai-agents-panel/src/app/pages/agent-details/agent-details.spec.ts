import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDetailsComponent } from './agent-details';

describe('AgentDetailsComponent', () => {
  let component: AgentDetailsComponent;
  let fixture: ComponentFixture<AgentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgentDetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
