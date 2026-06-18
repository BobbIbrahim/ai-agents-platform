import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentFormComponent } from './agent-form';

describe('AgentForm', () => {
  let component: AgentFormComponent;
  let fixture: ComponentFixture<AgentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgentFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
