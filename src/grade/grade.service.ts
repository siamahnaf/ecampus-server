import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Raw } from "typeorm";

//Entities
import { Grade } from "./model/grade.entity";

//Dto
import { GradeInput } from "./dto/grade.dto";
import { SearchInput } from "@/section/dto/search.dto";

//Req user
import { ReqUser } from "@/auth/Types/user.types";

@Injectable()
export class GradeService {
    //Constructor
    constructor(
        @InjectRepository(Grade) private gradeRepository: Repository<Grade>
    ) { };

    //Get all grades
    async gets(searchInput: SearchInput) {
        let args = {}
        if (searchInput.search) {
            args["name"] = Raw(alias => `LOWER(${alias}) Like '%${searchInput.search.toLowerCase()}%'`)
        }
        const grades = await this.gradeRepository.find({
            where: args,
            relations: {
                createdBy: true
            },
            order: {
                created_at: "DESC"
            }
        });
        return grades;
    };

    //Add Grade
    async add(gradeInput: GradeInput, reqUser: ReqUser) {
        const grade = await this.gradeRepository.findOneBy({
            name: gradeInput.name
        });
        if (grade) throw new NotFoundException("Grade system name already exits!");
        const newGrade = this.gradeRepository.create({
            ...gradeInput,
            createdBy: { id: reqUser.id }
        });
        await this.gradeRepository.save(newGrade);
        return {
            success: true,
            message: "Grade system added successfully!"
        }
    };

    //Update Grade
    async update(gradeInput: GradeInput, id: string, reqUser: ReqUser) {
        const grade = await this.gradeRepository.findOneBy({
            id: id
        });
        if (!grade) throw new NotFoundException("Grade system not found!");
        if (grade.name !== gradeInput.name) {
            const exist = await this.gradeRepository.findOneBy({
                name: gradeInput.name
            });
            if (exist) throw new NotFoundException("Grade system name already exist!");
        }
        await this.gradeRepository.update(id, {
            ...gradeInput,
            createdBy: { id: reqUser.id }
        });
        return {
            success: true,
            message: "Grade system updated successfully!"
        }
    };

    async delete(id: string) {
        try {
            const result = await this.gradeRepository.delete(id);
            if (result.affected === 0) throw new NotFoundException("Grade system not found!");
        } catch {
            throw new NotFoundException("Cannot delete grade system because it has related record!");
        }
        return {
            success: true,
            message: "Grade system Deleted Successfully!"
        }
    }
}