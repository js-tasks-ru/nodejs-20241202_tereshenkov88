import {
  Controller,
  Get,
  ParseBoolPipe,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskStatus } from "./task.model";
import { ParseEnumWithMessagePipe } from "./valid.pipe.enum";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query(
      "status",
      new ParseEnumWithMessagePipe(TaskStatus, { optional: true }),
    )
    status?: TaskStatus,
    @Query("page", new ParseIntPipe({ optional: true })) page?: number,
    @Query("limit", new ParseIntPipe({ optional: true })) limit?: number,
    @Query("sortBy", new ParseBoolPipe({ optional: true })) sortBy?: boolean,
  ) {
    return this.tasksService.getFilteredTasks(status, page, limit, sortBy);
  }
}
