package com.springboot.aiagentsbackend.service;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class MessageConsumer {

    @RabbitListener(queues = "agent-queue")
    public void receiveMessage(String message) {
        System.out.println("Received message: " + message);
    }
}