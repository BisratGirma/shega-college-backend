import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Course } from "./course.model";

@Entity()
export class Student {
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
