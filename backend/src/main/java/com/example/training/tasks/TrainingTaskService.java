package com.example.training.tasks;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class TrainingTaskService {
    private final TrainingTaskRepository repository;

    public TrainingTaskService(TrainingTaskRepository repository) {
        this.repository = repository;
    }

    public List<TrainingTask> list(String topic, TaskStatus status) {
        if (topic != null && status != null) return repository.findByTopicIgnoreCaseAndStatus(topic, status);
        if (topic != null) return repository.findByTopicIgnoreCase(topic);
        if (status != null) return repository.findByStatus(status);
        return repository.findAll();
    }

    public TrainingTask get(long id) {
        return repository.findWithStepsById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Training task " + id + " was not found"));
    }

    @Transactional
    public TrainingTask create(TaskDtos.CreateRequest request) {
        TrainingTask task = new TrainingTask();
        task.setTitle(request.title().trim());
        task.setTopic(request.topic().trim());
        task.setObjective(request.objective() == null ? "" : request.objective().trim());
        task.setSteps(request.steps());
        task.setStatus(request.status() == null ? TaskStatus.TO_DO : request.status());
        return repository.save(task);
    }

    @Transactional
    public TrainingTask update(long id, TaskDtos.UpdateRequest request) {
        TrainingTask task = get(id);
        List<String> steps = request.steps() == null ? List.of() : request.steps();
        if (!task.getSteps().equals(steps)) task.getCompletedSteps().clear();
        task.setTitle(request.title().trim());
        task.setTopic(request.topic().trim());
        task.setObjective(request.objective() == null ? "" : request.objective().trim());
        task.setSteps(steps);
        task.setNotes(request.notes() == null ? "" : request.notes());
        if (request.status() != null) task.setStatus(request.status());
        return repository.save(task);
    }

    @Transactional
    public TrainingTask updateStatus(long id, TaskDtos.StatusRequest request) {
        TrainingTask task = get(id);
        if (request.status() == null) throw new ValidationException("Status is required");
        task.setStatus(request.status());
        return repository.save(task);
    }

    @Transactional
    public TrainingTask updateStep(long id, int index, TaskDtos.StepStatusRequest request) {
        TrainingTask task = get(id);
        if (index < 0 || index >= task.getSteps().size()) {
            throw new ValidationException("Checklist step index is out of range");
        }
        if (request.completed()) task.getCompletedSteps().add(index);
        else task.getCompletedSteps().remove(index);
        return repository.save(task);
    }

    public void delete(long id) {
        if (!repository.existsById(id)) throw new ResourceNotFoundException("Training task " + id + " was not found");
        repository.deleteById(id);
    }
}
