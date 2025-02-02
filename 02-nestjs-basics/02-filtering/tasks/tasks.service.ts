import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },

    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getFilteredTasks(
    status?: TaskStatus,
    page?: number,
    limit?: number,
    sortBy?: boolean,
  ): Task[] {
    const currentPage = page || 1;
    const currentlimit = limit || 2;
    let filteredTask: Task[];
    if (!limit || !page) {
      let resultedArray: Task[] = [];
      if (sortBy) {
        resultedArray = [...this.tasks].sort((a, b) =>
          a.title.localeCompare(b.title, "ru", {
            sensitivity: "base",
            ignorePunctuation: true,
          }),
        );
      }
      if (status) {
        resultedArray = this.tasks.filter((task) => task.status === status);
      }
      return resultedArray.length > 0 ? resultedArray : this.tasks;
    }

    if (!status) {
      filteredTask = this.tasks;
    } else {
      filteredTask = this.tasks.filter((task) => task.status === status);
    }

    const startIndex = (currentPage - 1) * currentlimit;
    const endIndex = currentPage * currentlimit;
    const resFiltersTasks = filteredTask.slice(startIndex, endIndex);
    if (sortBy) {
      return [...resFiltersTasks].sort((a, b) =>
        a.title.localeCompare(b.title, "ru", {
          sensitivity: "base",
          ignorePunctuation: true,
        }),
      );
    }
    return resFiltersTasks;
  }
}
