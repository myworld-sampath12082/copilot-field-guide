package com.example.training.tasks;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import java.util.Set;

public class TaskDtos {
    public record CreateRequest(
            @NotBlank(message = "Title is required") String title,
            @NotBlank(message = "Topic is required") String topic,
            String objective,
            List<String> steps,
            TaskStatus status
    ) {}

    public record UpdateRequest(
            @NotBlank(message = "Title is required") String title,
            @NotBlank(message = "Topic is required") String topic,
            String objective,
            List<String> steps,
            String notes,
            TaskStatus status
    ) {}

    public record StatusRequest(TaskStatus status) {}
    public record StepStatusRequest(@NotNull Boolean completed) {}
    public record SummaryResponse(Long id, String title, String topic, TaskStatus status) {}
    public record DetailResponse(
            Long id, String title, String topic, String objective,
            List<String> steps, Set<Integer> completedSteps, String notes, TaskStatus status
    ) {}
}
