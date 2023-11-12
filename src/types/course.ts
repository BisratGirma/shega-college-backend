import { IsNumber, IsString } from "class-validator";

export class CourseData {
  @IsString()
  title!: string;

  @IsString()
  course_code!: string;

  @IsString()
  description!: string;

  @IsNumber()
  credit_hours!: number;
}

export class CourseUpdateData {
  @IsString()
  title?: string;

  @IsString()
  course_code?: string;

  @IsString()
  description?: string;

  @IsNumber()
  credit_hours?: number;
}
