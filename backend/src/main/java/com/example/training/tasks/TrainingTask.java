package com.example.training.tasks;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "training_tasks")
public class TrainingTask {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String topic;
    @Column(columnDefinition = "text")
    private String objective = "";
    @ElementCollection
    @CollectionTable(name = "training_task_steps", joinColumns = @JoinColumn(name = "task_id"))
    @Column(name = "step", columnDefinition = "text")
    @OrderColumn(name = "position")
    private List<String> steps = new ArrayList<>();
    @ElementCollection
    @CollectionTable(name = "training_task_completed_steps", joinColumns = @JoinColumn(name = "task_id"))
    @Column(name = "step_index", nullable = false)
    private Set<Integer> completedSteps = new HashSet<>();
    @Column(columnDefinition = "text")
    private String notes = "";
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskStatus status = TaskStatus.TO_DO;
    @Column(nullable = false)
    private Instant createdAt = Instant.now();
    @Column(nullable = false)
    private Instant updatedAt = Instant.now();

    public TrainingTask() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }
    public String getObjective() { return objective; }
    public void setObjective(String objective) { this.objective = objective; }
    public List<String> getSteps() { return steps; }
    public void setSteps(List<String> steps) {
        this.steps = steps == null ? new ArrayList<>() : new ArrayList<>(steps);
    }
    public Set<Integer> getCompletedSteps() { return completedSteps; }
    public void setCompletedSteps(Set<Integer> completedSteps) {
        this.completedSteps = completedSteps == null ? new HashSet<>() : completedSteps;
    }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public TaskStatus getStatus() { return status; }
    public void setStatus(TaskStatus status) { this.status = status; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }

    @PreUpdate
    void touch() { this.updatedAt = Instant.now(); }
}
