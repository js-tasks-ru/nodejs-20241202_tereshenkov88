import {
  IsNotEmpty,
  Length,
  IsEnum,
  IsString,
  IsOptional,
} from "class-validator";
import { Task, TaskStatus } from "./task.model";

export class TaskDto implements Task {
  @IsString()
  @IsNotEmpty()
  @Length(5, Infinity)
  description: string;

  @IsOptional()
  @IsString()
  id?: string;
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsString()
  @IsNotEmpty()
  @Length(5, Infinity)
  title: string;
}
