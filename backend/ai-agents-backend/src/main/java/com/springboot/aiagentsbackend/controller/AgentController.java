package com.springboot.aiagentsbackend.controller;

import com.springboot.aiagentsbackend.model.Agent;
import com.springboot.aiagentsbackend.service.AgentService;
import com.springboot.aiagentsbackend.service.MessageProducer;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agents")
public class AgentController {

    private final AgentService agentService;
    private final MessageProducer messageProducer;

    public AgentController(AgentService agentService, MessageProducer messageProducer) {
        this.agentService = agentService;
        this.messageProducer = messageProducer;
    }

    @GetMapping
    public ResponseEntity<List<Agent>> getAllAgents() {
        return ResponseEntity.ok(agentService.getAllAgents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agent> getAgentById(@PathVariable Long id) {
        return ResponseEntity.ok(agentService.getAgentById(id));
    }

    @PostMapping
    public ResponseEntity<Agent> createAgent(@Valid @RequestBody Agent agent) {
        Agent createdAgent = agentService.createAgent(agent);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAgent);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Agent> updateAgent(@PathVariable Long id, @Valid @RequestBody Agent agent) {
        return ResponseEntity.ok(agentService.updateAgent(id, agent));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAgent(@PathVariable Long id) {
        agentService.deleteAgent(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/test-rabbit")
    public String testRabbit() {
        messageProducer.sendMessage("Hello RabbitMQ");
        return "Message sent!";
    }

}
