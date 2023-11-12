import { IsNumber, IsString } from "class-validator";

export class StudentData {
  @IsString()
  name!: string;

  @IsString()
  contact_details!: string;
}

export class StudentUpdateData {
  @IsString()
  name?: string;

  @IsString()
  contact_details?: string;

  @IsNumber({}, { each: true })
  courses?: number[];
}
