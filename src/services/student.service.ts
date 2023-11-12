import server from "../server";
import { Student } from "../models/student.model";
import { Like } from "typeorm";
import { PaginationOptions } from "../types/general";

export class StudentService {
  dataSource = server.appDataSource;
  private studentRepository = this.dataSource.getRepository(Student);

  // gets all registered students from db
  async getAllStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  // gets a student with a specific id
  async getStudentById(studentId: number): Promise<Student | null> {
    return this.studentRepository.findOne({ where: { student_id: studentId } });
  }

  // gets a list of students with pagination
  async getStudentPagination({
    skip,
    take,
    keyword,
  }: PaginationOptions): Promise<{ data: Student[]; count: number }> {
    take = take || 10;
    skip = skip || 0;
    keyword = keyword || "";

    const [result, total] = await this.studentRepository.findAndCount({
      where: { name: Like("%" + keyword + "%") },
      order: { name: "DESC" },
      take: take,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  // creates a new student document on db
  async createStudent(newStudentData: Partial<Student>): Promise<Student> {
    const newStudent = this.studentRepository.create(newStudentData);
    return this.studentRepository.save(newStudent);
  }

  // updates student using student id
  async updateStudent(
    studentId: number,
    updatedStudentData: Partial<Student>
  ): Promise<Student | null> {
    const student = await this.getStudentById(studentId);
    if (!student) {
      return null;
    }
    Object.assign(student, updatedStudentData);
    return this.studentRepository.save(student);
  }

  // deletes student using student id
  async deleteStudent(studentId: number): Promise<boolean> {
    const deleteResult = await this.studentRepository.delete(studentId);
    return deleteResult.affected != null && deleteResult.affected > 0;
  }
}
