package com.springboot.aiagentsbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "agents")
public class Agent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Agent name is required")
    @Size(max = 100, message = "Agent name must not exceed 100 characters")
    private String name;

    @NotBlank(message = "Agent role is required")
    @Size(max = 100, message = "Agent role must not exceed 100 characters")
    private String role;

    @NotBlank(message = "Agent description is required")
    @Size(max = 500, message = "Agent description must not exceed 500 characters")
    private String description;

    public Agent() {
    }

    public Agent(String name, String role, String description) {
        this.name = name;
        this.role = role;
        this.description = description;
    }

    public Agent(Long id, String name, String role, String description) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getRole() {
        return role;
    }

    public String getDescription() {
        return description;
    }



    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
