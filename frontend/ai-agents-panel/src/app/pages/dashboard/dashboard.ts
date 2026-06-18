import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { AgentService } from '../../services/agent.service';
import { Agent } from '../../services/agent';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  agents: Agent[] = [];
  agentCount = 0;
  roleCount = 0;
  latestAgent?: Agent;

  constructor(
    private agentService: AgentService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    this.agentService.getAgents().subscribe({
      next: (agents) => {
        this.agents = agents;
        this.agentCount = agents.length;
        this.roleCount = new Set(agents.map(agent => agent.role)).size;
        this.latestAgent = agents.length > 0 ? agents[agents.length - 1] : undefined;

        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load dashboard data', error);
      }
    });
  }
}