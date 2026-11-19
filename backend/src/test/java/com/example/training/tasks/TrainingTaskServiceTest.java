package com.example.training.tasks;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
class TrainingTaskServiceTest {
    @Autowired TrainingTaskService service;

    @Test
    void createAndUpdateStatus() {
        TrainingTask task = service.create(new TaskDtos.CreateRequest(
                "Add agent guidance", "AGENTS.md", "Set shared rules",
                List.of("Choose scope", "Write rules"), null));
        assertThat(task.getStatus()).isEqualTo(TaskStatus.TO_DO);

        TrainingTask edited = service.update(task.getId(), new TaskDtos.UpdateRequest(
                task.getTitle(), "README.md", task.getObjective(), task.getSteps(), "", task.getStatus()));
        assertThat(edited.getTopic()).isEqualTo("README.md");

        TrainingTask updated = service.updateStatus(task.getId(),
                new TaskDtos.StatusRequest(TaskStatus.DONE));
        assertThat(updated.getStatus()).isEqualTo(TaskStatus.DONE);
    }

    @Test
    void missingTaskReturnsNotFound() {
        assertThatThrownBy(() -> service.get(999999))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void initializesSampleGuidanceLessons() {
        assertThat(service.list("AGENTS.md", null))
                .extracting(TrainingTask::getTitle)
                .contains("Add repository-wide agent guidance");
    }
}
