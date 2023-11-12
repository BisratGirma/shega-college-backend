import server from "../server";
import { Course } from "../models/course.model";
import { Like } from "typeorm";
import { PaginationOptions } from "../types/general";

export class CourseService {
  dataSource = server.appDataSource;
  private courseRepository = this.dataSource.getRepository(Course);

  // gets all registered courses from db
  async getAllCourses(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  // gets a course with a specific id
  async getCourseById(courseId: number): Promise<Course | null> {
    return this.courseRepository.findOne({ where: { course_id: courseId } });
  }

  // gets a list of courses with pagination
  async getCoursePagination({
    skip,
    take,
    keyword,
  }: PaginationOptions): Promise<{ data: Course[]; count: number }> {
    take = take || 10;
    skip = skip || 0;
    keyword = keyword || "";

    const [result, total] = await this.courseRepository.findAndCount({
      where: { title: Like("%" + keyword + "%") },
      order: { title: "DESC" },
      take: take,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  // creates a new course document on db
  async createCourse(newCourseData: Partial<Course>): Promise<Course> {
    const newCourse = this.courseRepository.create(newCourseData);
    return this.courseRepository.save(newCourse);
  }

  // updates course using course id
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

  // deletes course using course id
  async deleteCourse(courseId: number): Promise<boolean> {
    const deleteResult = await this.courseRepository.delete(courseId);
    return deleteResult.affected != null && deleteResult.affected > 0;
  }
}
