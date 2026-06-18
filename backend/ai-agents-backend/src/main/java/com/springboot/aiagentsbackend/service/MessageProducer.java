package com.springboot.aiagentsbackend.service;

import com.springboot.aiagentsbackend.messaging.AgentCreatedEvent;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class MessageProducer {

    private final RabbitTemplate rabbitTemplate;

    public MessageProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendAgentCreatedEvent(AgentCreatedEvent event) {
        rabbitTemplate.convertAndSend("agent-queue", event);
        System.out.println("Sent event: " + event.getEventType() + " for agent " + event.getAgentName());
    }

    public void sendMessage(String message) {
        rabbitTemplate.convertAndSend("agent-queue", message);
        System.out.println("Sent message: " + message);
    }
}