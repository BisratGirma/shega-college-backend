import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Course } from "./course.model";
import { Student } from "./student.model";

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  grade_id!: number;

  @Column()
  grade_letter!: string;

  @Column()
  academic_period!: string;

  @ManyToOne(() => Course, (course) => course.grades)
  course!: Course;
}
