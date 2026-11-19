package com.example.training.tasks;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class TrainingTaskController {
    private final TrainingTaskService service;

    public TrainingTaskController(TrainingTaskService service) { this.service = service; }

    @GetMapping("/health")
    public Health health() { return new Health("ok"); }

    @GetMapping("/tasks")
    public List<TaskDtos.SummaryResponse> list(
            @RequestParam(required = false) String topic,
            @RequestParam(required = false) TaskStatus status) {
        return service.list(topic, status).stream().map(t ->
                new TaskDtos.SummaryResponse(t.getId(), t.getTitle(), t.getTopic(), t.getStatus())).toList();
    }

    @PostMapping("/tasks")
    @ResponseStatus(HttpStatus.CREATED)
    public TaskDtos.SummaryResponse create(@Valid @RequestBody TaskDtos.CreateRequest request) {
        TrainingTask t = service.create(request);
        return new TaskDtos.SummaryResponse(t.getId(), t.getTitle(), t.getTopic(), t.getStatus());
    }

    @GetMapping("/tasks/{id}")
    public TaskDtos.DetailResponse get(@PathVariable long id) {
        TrainingTask t = service.get(id);
        return detail(t);
    }

    @PutMapping("/tasks/{id}")
    public TaskDtos.DetailResponse update(@PathVariable long id, @Valid @RequestBody TaskDtos.UpdateRequest request) {
        return detail(service.update(id, request));
    }

    @PatchMapping("/tasks/{id}/status")
    public TaskDtos.DetailResponse updateStatus(@PathVariable long id,
                                                 @Valid @RequestBody TaskDtos.StatusRequest request) {
        return detail(service.updateStatus(id, request));
    }

    @PatchMapping("/tasks/{id}/steps/{index}")
    public TaskDtos.DetailResponse updateStep(@PathVariable long id, @PathVariable int index,
                                               @Valid @RequestBody TaskDtos.StepStatusRequest request) {
        return detail(service.updateStep(id, index, request));
    }

    @DeleteMapping("/tasks/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable long id) { service.delete(id); }

    private TaskDtos.DetailResponse detail(TrainingTask t) {
        return new TaskDtos.DetailResponse(t.getId(), t.getTitle(), t.getTopic(), t.getObjective(),
                t.getSteps(), t.getCompletedSteps(), t.getNotes(), t.getStatus());
    }

    public record Health(String status) {}
}
