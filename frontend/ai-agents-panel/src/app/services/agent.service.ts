import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agent } from './agent';

type CreateAgentRequest = Omit<Agent, 'id'>;

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private apiUrl = 'http://localhost:8080/api/agents';

  constructor(private http: HttpClient) {}

  getAgents(): Observable<Agent[]> {
    return this.http.get<Agent[]>(this.apiUrl);
  }

  getAgentById(id: number): Observable<Agent> {
    return this.http.get<Agent>(`${this.apiUrl}/${id}`);
  }

  addAgent(agent: CreateAgentRequest): Observable<Agent> {
    return this.http.post<Agent>(this.apiUrl, agent);
  }

  updateAgent(agent: Agent): Observable<Agent> {
    return this.http.put<Agent>(`${this.apiUrl}/${agent.id}`, agent);
  }

  deleteAgent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}