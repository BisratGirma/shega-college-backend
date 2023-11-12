import server from "../server";
import { Grade } from "../models/grade.model";

export class GradeService {
  dataSource = server.appDataSource;
  private gradeRepository = this.dataSource.getRepository(Grade);

  async getAllGrades(): Promise<Grade[]> {
    return this.gradeRepository.find();
  }

  async getGradeById(gradeId: number): Promise<Grade | null> {
    return this.gradeRepository.findOne({ where: { grade_id: gradeId } });
  }

  async createGrade(newGradeData: Partial<Grade>): Promise<Grade> {
    const newGrade = this.gradeRepository.create(newGradeData);
    return this.gradeRepository.save(newGrade);
  }

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

  async deleteGrade(gradeId: number): Promise<boolean> {
    const deleteResult = await this.gradeRepository.delete(gradeId);
    return deleteResult.affected != null && deleteResult.affected > 0;
  }
}
