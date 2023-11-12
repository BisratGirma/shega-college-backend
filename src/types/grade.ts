import { IsNumber, IsString, Matches } from "class-validator";

export class GradeData {
  @Matches(/(?<=^|[\s,])(?:[A-D][-+]?|F)(?=[-+.]\B|[\s,]|$)/, {
    message: "please, provide a valid grade letter!",
  })
  grade_letter!: string;

  @IsString()
  academic_period!: string;

  @IsNumber()
  course_id!: number;
}

export class GradeUpdateData {
  @Matches(/(?<=^|[\s,])(?:[A-D][-+]?|F)(?=[-+.]\B|[\s,]|$)/, {
    message: "please, provide a valid grade letter!",
  })
  grade_letter?: string;

  @IsString()
  academic_period?: string;

  @IsNumber()
  course_id?: number;
}
