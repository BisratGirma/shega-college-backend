import {
  Entity,
  PrimaryGeneratedColumn,
  ObjectId,
  Column,
  OneToMany,
  ObjectIdColumn,
} from "typeorm";
import { Grade } from "./grade.model";

@Entity()
export class Course {
  @ObjectIdColumn()
  id!: ObjectId;

  @PrimaryGeneratedColumn()
  course_id!: number;

  @Column()
  title!: string;

  @Column()
  course_code!: string;

  @Column()
  description!: string;

  @Column()
  credit_hours!: number;

  @OneToMany(() => Grade, (grade) => grade.course)
  grades!: Grade[];
}
