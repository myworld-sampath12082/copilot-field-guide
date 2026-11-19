package com.example.training.tasks;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.EntityGraph;
import java.util.List;
import java.util.Optional;

public interface TrainingTaskRepository extends JpaRepository<TrainingTask, Long> {
    List<TrainingTask> findByTopicIgnoreCase(String topic);
    List<TrainingTask> findByStatus(TaskStatus status);
    List<TrainingTask> findByTopicIgnoreCaseAndStatus(String topic, TaskStatus status);

    @EntityGraph(attributePaths = {"steps", "completedSteps"})
    Optional<TrainingTask> findWithStepsById(Long id);
}
