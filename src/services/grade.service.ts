import server from "../server";
import { Grade } from "../models/grade.model";
import { Like } from "typeorm";
import { PaginationOptions } from "../types/general";

export class GradeService {
  dataSource = server.appDataSource;
  private gradeRepository = this.dataSource.getRepository(Grade);

  // gets all registered grades from db
  async getAllGrades(): Promise<Grade[]> {
    return this.gradeRepository.find();
  }

  // gets a grade with a specific id
  async getGradeById(gradeId: number): Promise<Grade | null> {
    return this.gradeRepository.findOne({ where: { grade_id: gradeId } });
  }

  // gets a list of grades with pagination
  async getGradePagination({
    skip,
    take,
    keyword,
  }: PaginationOptions): Promise<{ data: Grade[]; count: number }> {
    take = take || 10;
    skip = skip || 0;
    keyword = keyword || "";

    const [result, total] = await this.gradeRepository.findAndCount({
      where: { academic_period: Like("%" + keyword + "%") },
      order: { academic_period: "DESC" },
      take: take,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  // creates a new grade document on db
  async createGrade(newGradeData: Partial<Grade>): Promise<Grade> {
    const newGrade = this.gradeRepository.create(newGradeData);
    return this.gradeRepository.save(newGrade);
  }

  // updates grade using grade id
  async updateGrade(
    gradeId: number,
    updatedGradeData: Partial<Grade>
  ): Promise<Grade | null> {
    const grade = await this.getGradeById(gradeId);
    if (!grade) {
      return null;
    }
    Object.assign(grade, updatedGradeData);
    return this.gradeRepository.save(grade);
  }

  // deletes grade using grade id
  async deleteGrade(gradeId: number): Promise<boolean> {
    const deleteResult = await this.gradeRepository.delete(gradeId);
    return deleteResult.affected != null && deleteResult.affected > 0;
  }
}
