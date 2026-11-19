package com.example.training.tasks;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class TrainingTaskInitializer implements CommandLineRunner {
    private final TrainingTaskRepository repository;

    public TrainingTaskInitializer(TrainingTaskRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() > 0) return;

        repository.saveAll(List.of(
                task("Add repository-wide agent guidance", "AGENTS.md",
                        "Give coding agents clear, shared rules for working in a repository.",
                        List.of("Identify rules that apply to every task", "Write concise, actionable guidance",
                                "Check that the guidance does not conflict with more specific instructions"),
                        TaskStatus.TO_DO),
                task("Document setup and usage", "README.md",
                        "Help contributors understand the project and run it locally.",
                        List.of("List prerequisites", "Document setup and run commands",
                                "Explain the main features and project structure"),
                        TaskStatus.IN_PROGRESS),
                task("Write Copilot repository instructions", ".github/copilot-instructions.md",
                        "Give GitHub Copilot repository-specific context and conventions.",
                        List.of("Describe the project and its architecture", "Record important coding conventions",
                                "Keep instructions focused and easy to maintain"),
                        TaskStatus.TO_DO),
                task("Scope instructions to file patterns", ".github/instructions/",
                        "Apply specialized guidance only to the files it is meant to govern.",
                        List.of("Choose a file glob", "Write focused instructions for matching files",
                                "Verify the instructions apply only to the intended files"),
                        TaskStatus.TO_DO),
                task("Map the codebase", "overview.md",
                        "Create a concise map of the architecture, key modules, and important data flows.",
                        List.of("Identify the main application areas", "Describe important relationships",
                                "Link to the source files that are useful starting points"),
                        TaskStatus.DONE),
                task("Package a reusable skill", "skills",
                        "Capture a repeatable, task-specific workflow so it can be reused consistently.",
                        List.of("Define when the skill should be used", "Write the workflow steps",
                                "Include examples and any relevant references"),
                        TaskStatus.TO_DO)
        ));
    }

    private TrainingTask task(String title, String topic, String objective,
                              List<String> steps, TaskStatus status) {
        TrainingTask task = new TrainingTask();
        task.setTitle(title);
        task.setTopic(topic);
        task.setObjective(objective);
        task.setSteps(steps);
        task.setStatus(status);
        return task;
    }
}
