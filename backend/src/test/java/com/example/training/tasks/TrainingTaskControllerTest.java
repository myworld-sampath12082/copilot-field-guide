package com.example.training.tasks;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class TrainingTaskControllerTest {
    @Autowired MockMvc mvc;
    @Autowired TrainingTaskService service;

    @Test
    void createsAndReadsTask() throws Exception {
        String body = """
                {"title":"Document setup","topic":"README.md","objective":"Explain setup","steps":["Write prerequisites"],"status":"TO_DO"}
                """;
        mvc.perform(post("/api/tasks").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Document setup"));

        mvc.perform(get("/api/tasks").param("topic", "README.md"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].topic").value("README.md"));
    }

    @Test
    void rejectsBlankTitle() throws Exception {
        mvc.perform(post("/api/tasks").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\" \",\"topic\":\"skills\"}"))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(jsonPath("$.error").value("Unprocessable Entity"));
    }

    @Test
    void returnsChecklistForTaskDetail() throws Exception {
        TrainingTask task = service.create(new TaskDtos.CreateRequest(
                "Test checklist loading", "AGENTS.md", "Verify task details",
                java.util.List.of("Read the checklist"), null));

        mvc.perform(get("/api/tasks/{id}", task.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.steps[0]").value("Read the checklist"));
    }

    @Test
    void savesChecklistStepCompletion() throws Exception {
        TrainingTask task = service.create(new TaskDtos.CreateRequest(
                "Test checklist progress", "AGENTS.md", "Verify checklist progress",
                java.util.List.of("Complete this step"), null));

        mvc.perform(patch("/api/tasks/{id}/steps/0", task.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"completed\":true}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.completedSteps[0]").value(0));
    }
}
