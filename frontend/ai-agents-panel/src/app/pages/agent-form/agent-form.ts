import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AgentService } from '../../services/agent.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-agent-form',
  standalone: true,
  imports: [FormsModule, NgIf, MatButtonModule],
  templateUrl: './agent-form.html',
  styleUrls: ['./agent-form.css']
})
export class AgentFormComponent {
  name = '';
  role = '';
  description = '';
  errorMessage = '';

  private errorTimeoutId?: ReturnType<typeof setTimeout>;

  constructor(
    private agentService: AgentService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  addAgent() {
    if (!this.name.trim() || !this.role.trim() || !this.description.trim()) {
      this.showError('Failed: name, role, and description are required.');
      return;
    }

    const newAgent = {
      name: this.name.trim(),
      role: this.role.trim(),
      description: this.description.trim()
    };

    this.agentService.addAgent(newAgent).subscribe({
      next: () => {
        this.name = '';
        this.role = '';
        this.description = '';
        this.errorMessage = '';

        sessionStorage.setItem('successMessage', 'Agent added successfully.');
        this.router.navigate(['/agents']);
      },
      error: (error) => {
        console.error('Failed to add agent', error);
        this.showError('Failed to add agent. Please try again.');
      }
    });
  }

  private showError(message: string) {
    this.errorMessage = message;

    if (this.errorTimeoutId) {
      clearTimeout(this.errorTimeoutId);
    }

    this.errorTimeoutId = setTimeout(() => {
      this.errorMessage = '';
      this.changeDetectorRef.detectChanges();
    }, 3000);
  }
}