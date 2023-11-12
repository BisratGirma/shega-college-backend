import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ObjectIdColumn,
  ObjectId,
} from "typeorm";
import { Course } from "./course.model";

@Entity()
export class Student {
  @ObjectIdColumn()
  id!: ObjectId;

  @PrimaryGeneratedColumn()
  student_id!: number;

  @Column()
  name!: string;

  @Column()
  contact_details!: string;

  @ManyToMany(() => Course)
  @JoinTable()
  courses?: Course[];
}
