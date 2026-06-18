import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

import { AgentService } from '../../services/agent.service';
import { Agent } from '../../services/agent';

@Component({
  selector: 'app-agent-details',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './agent-details.html',
  styleUrls: ['./agent-details.css']
})
export class AgentDetailsComponent implements OnInit {
  agent?: Agent;
  isLoading = true;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agentService: AgentService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.isLoading = false;
      this.notFound = true;
      this.changeDetectorRef.detectChanges();
      return;
    }

    this.loadAgent(id);
  }

  saveAgent() {
    if (!this.agent) {
      return;
    }

    this.agentService.updateAgent(this.agent).subscribe({
      next: () => {
        sessionStorage.setItem('successMessage', 'Agent updated successfully.');
        this.router.navigate(['/agents']);
      },
      error: (error) => {
        console.error('Failed to update agent', error);
      }
    });
  }

  goBack() {
    this.router.navigate(['/agents']);
  }

  private loadAgent(id: number) {
    this.isLoading = true;
    this.notFound = false;

    this.agentService.getAgentById(id).subscribe({
      next: (agent) => {
        this.agent = agent;
        this.isLoading = false;
        this.notFound = !agent;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load agent', error);
        this.agent = undefined;
        this.isLoading = false;
        this.notFound = true;
        this.changeDetectorRef.detectChanges();
      }
    });
  }
}