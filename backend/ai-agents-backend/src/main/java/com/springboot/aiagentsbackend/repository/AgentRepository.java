package com.springboot.aiagentsbackend.repository;

import com.springboot.aiagentsbackend.model.Agent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgentRepository extends JpaRepository<Agent, Long> {
}
