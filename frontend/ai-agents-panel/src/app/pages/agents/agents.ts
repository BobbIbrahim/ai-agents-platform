import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AgentService } from '../../services/agent.service';
import { Agent } from '../../services/agent';

@Component({
  selector: 'app-agents',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './agents.html',
  styleUrls: ['./agents.css']
})
export class AgentsComponent implements OnInit {
  agents: Agent[] = [];
  successMessage = '';
  errorMessage = '';
  isLoading = true;

  private successTimeoutId?: ReturnType<typeof setTimeout>;

  constructor(
    private agentService: AgentService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAgents();

    const message = sessionStorage.getItem('successMessage');

    if (message) {
      this.showSuccess(message);
      sessionStorage.removeItem('successMessage');
    }
  }

  deleteAgent(id: number): void {
    this.agentService.deleteAgent(id).subscribe({
      next: () => {
        this.loadAgents();
        this.showSuccess('Agent deleted successfully.');
      },
      error: (error) => {
        console.error('Failed to delete agent', error);
        this.errorMessage = 'Failed to delete agent.';
      }
    });
  }

  private loadAgents(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.agentService.getAgents().subscribe({
      next: (agents) => {
        console.log('Agents loaded from backend:', agents);
        this.agents = Array.isArray(agents) ? agents : [];
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load agents', error);
        this.agents = [];
        this.isLoading = false;
        this.errorMessage = 'Failed to load agents.';
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  private showSuccess(message: string): void {
    this.successMessage = message;

    if (this.successTimeoutId) {
      clearTimeout(this.successTimeoutId);
    }

    this.successTimeoutId = setTimeout(() => {
      this.successMessage = '';
      this.changeDetectorRef.detectChanges();
    }, 3000);
  }
}
