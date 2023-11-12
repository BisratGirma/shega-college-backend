import server from "../server";
import { Course } from "../models/course.model";

export class CourseService {
  dataSource = server.appDataSource;
  private courseRepository = this.dataSource.getRepository(Course);

  async getAllCourses(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  async getCourseById(courseId: number): Promise<Course | null> {
    return this.courseRepository.findOne({ where: { course_id: courseId } });
  }

  async createCourse(newCourseData: Partial<Course>): Promise<Course> {
    const newCourse = this.courseRepository.create(newCourseData);
    return this.courseRepository.save(newCourse);
  }

  async updateCourse(
    courseId: number,
    updatedCourseData: Partial<Course>
  ): Promise<Course | null> {
    const course = await this.getCourseById(courseId);
    if (!course) {
      return null;
    }
    Object.assign(course, updatedCourseData);
    return this.courseRepository.save(course);
  }

  async deleteCourse(courseId: number): Promise<boolean> {
    const deleteResult = await this.courseRepository.delete(courseId);
    return deleteResult.affected != null && deleteResult.affected > 0;
  }
}
