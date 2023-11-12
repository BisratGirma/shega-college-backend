import server from "../server";
import { Student } from "../models/student.model";

export class StudentService {
  dataSource = server.appDataSource;
  private studentRepository = this.dataSource.getRepository(Student);

  async getAllStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async getStudentById(studentId: number): Promise<Student | null> {
    return this.studentRepository.findOne({ where: { student_id: studentId } });
  }

  async createStudent(newStudentData: Partial<Student>): Promise<Student> {
    const newStudent = this.studentRepository.create(newStudentData);
    return this.studentRepository.save(newStudent);
  }

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

  async deleteStudent(studentId: number): Promise<boolean> {
    const deleteResult = await this.studentRepository.delete(studentId);
    return deleteResult.affected != null && deleteResult.affected > 0;
  }
}
