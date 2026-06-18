package com.springboot.aiagentsbackend.messaging;

public class AgentCreatedEvent {

    private String eventType;
    private Long agentId;
    private String agentName;
    private String role;

    public AgentCreatedEvent() {
    }

    public AgentCreatedEvent(String eventType, Long agentId, String agentName, String role) {
        this.eventType = eventType;
        this.agentId = agentId;
        this.agentName = agentName;
        this.role = role;
    }

    public String getEventType() {
        return eventType;
    }

    public Long getAgentId() {
        return agentId;
    }

    public String getAgentName() {
        return agentName;
    }

    public String getRole() {
        return role;
    }
}