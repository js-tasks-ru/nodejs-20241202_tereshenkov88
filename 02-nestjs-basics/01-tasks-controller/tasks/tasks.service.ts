import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private taskCount = 1;
  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException("не существующая задача");
    }
    return task;
  }

  createTask(task: Task): Task {
    if (!task.id) {
      task.id = ++this.taskCount + "";
    }
    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, update: Task): Task {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index !== -1) {
      update.id = this.tasks[index].id;
      this.tasks[index] = update;
    } else {
      throw new NotFoundException("не существующая задача");
    }
    return update;
  }

  deleteTask(id: string): Task {
    let task: Task;

    const filterTasks = this.tasks.filter((t) => {
      if (t.id !== id) {
        return true;
      }
      task = t;
      return false;
    });
    if (filterTasks.length === this.tasks.length) {
      throw new NotFoundException("не существующая задача");
    }
    this.tasks = filterTasks;
    return task;
  }
}
