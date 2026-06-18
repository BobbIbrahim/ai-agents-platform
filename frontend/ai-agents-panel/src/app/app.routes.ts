import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { AgentsComponent } from './pages/agents/agents';
import { AgentFormComponent } from './pages/agent-form/agent-form';
import { AgentDetailsComponent } from './pages/agent-details/agent-details';


export const routes: Routes = [
    
  { path: '', component: DashboardComponent },
  { path: 'agents', component: AgentsComponent },
  { path: 'agents/new', component: AgentFormComponent},
  { path: 'agents/:id', component: AgentDetailsComponent }
];
