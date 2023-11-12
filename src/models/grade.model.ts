import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ObjectIdColumn,
  ObjectId,
} from "typeorm";
import { Course } from "./course.model";

@Entity()
export class Grade {
  @ObjectIdColumn()
  id!: ObjectId;

  @PrimaryGeneratedColumn()
  grade_id!: number;

  @Column()
  grade_letter!: string;

  @Column()
  academic_period!: string;

  @ManyToOne(() => Course, (course) => course.grades)
  course!: Course;
}
