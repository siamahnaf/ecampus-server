import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { paginate, PaginationTypeEnum } from "nestjs-typeorm-paginate";

//Entities
import { Exam } from "./model/exam.entity";
import { Conf } from "./model/conf.entity";
import { TotalMarks } from "./model/conf.entity";
import { Subject } from "@/subject/model/subject.entity";

//Dto
import { ExamInput } from "./dto/exam.dto";
import { SearchInput } from "@/section/dto/search.dto";
import { ConfInput } from "./dto/conf.dto";

//Req user
import { ReqUser } from "@/auth/Types/user.types";

@Injectable()
export class ExamService {
    //Constructor
    constructor(
        @InjectRepository(Exam) private examRepository: Repository<Exam>,
        @InjectRepository(TotalMarks) private totalMarkRepository: Repository<TotalMarks>,
        @InjectRepository(Conf) private confRepository: Repository<Conf>,
        @InjectRepository(Subject) private subjectRepository: Repository<Subject>
    ) { };

    //------------------------------Exam--------------------------------------------//

    //Get all exams with pagination
    async gets(searchInput: SearchInput) {
        const exams = await this.examRepository
            .createQueryBuilder("exam")
            .leftJoinAndSelect("exam.type", "type")
            .leftJoinAndSelect("exam.createdBy", "createdBy")
            .orderBy("exam.created_at", searchInput.orderBy ?? "DESC")

        if (searchInput.search) {
            exams.where("LOWER(exam.name) LIKE :search", { search: `%${searchInput.search.toLowerCase()}%` })
        }

        const { items, meta } = await paginate<Exam>(exams, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    };

    //Get all exams without pagination
    async getAll() {
        const exams = await this.examRepository.find({
            relations: {
                type: true,
                createdBy: true
            },
            order: {
                created_at: "DESC"
            }
        });
        return exams;
    }

    //Add Grade
    async add(examInput: ExamInput, reqUser: ReqUser) {
        const exam = await this.examRepository.findOneBy({
            name: examInput.name
        });
        if (exam) throw new NotFoundException("Exam name already exits!");
        const newExam = this.examRepository.create({
            ...examInput,
            type: { id: examInput.type },
            createdBy: { id: reqUser.id }
        });
        await this.examRepository.save(newExam);
        return {
            success: true,
            message: "Exam added successfully!"
        }
    };

    //Update Grade
    async update(examInput: ExamInput, id: string, reqUser: ReqUser) {
        const exam = await this.examRepository.findOneBy({
            id: id
        });
        if (!exam) throw new NotFoundException("Exam not found!");
        if (exam.name !== examInput.name) {
            const exist = await this.examRepository.findOneBy({
                name: examInput.name
            });
            if (exist) throw new NotFoundException("Exam name already exist!");
        }
        await this.examRepository.update(id, {
            ...examInput,
            type: { id: examInput.type },
            createdBy: { id: reqUser.id }
        });
        return {
            success: true,
            message: "Exam updated successfully!"
        }
    };

    //Delete
    async delete(id: string) {
        try {
            const result = await this.examRepository.delete(id);
            if (result.affected === 0) throw new NotFoundException("Exam not found!");
        } catch {
            throw new NotFoundException("Cannot delete exam because it has related record!");
        }
        return {
            success: true,
            message: "Exam Deleted Successfully!"
        }
    };

    //-----------------------------------Exam Conf---------------------------------//
    //Get all confs with pagination
    async getConfs(searchInput: SearchInput) {
        const confs = await this.confRepository
            .createQueryBuilder("conf")
            .leftJoinAndSelect("conf.classId", "classId")
            .leftJoinAndSelect("conf.examId", "examId")
            .leftJoinAndSelect("conf.subjects", "subjects")
            .leftJoinAndSelect("subjects.subjectId", "subjectId")
            .leftJoinAndSelect("conf.createdBy", "createdBy")
            .orderBy("conf.created_at", searchInput.orderBy ?? "DESC")

        if (searchInput.search) {
            confs.where("LOWER(conf.classId.name) LIKE :search", { search: `%${searchInput.search.toLowerCase()}%` })
        }

        const { items, meta } = await paginate<Conf>(confs, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    };

    //Get all confs with pagination
    async getAllConf() {
        const confs = await this.confRepository.find({
            relations: {
                classId: true,
                examId: true,
                subjects: {
                    subjectId: true
                },
                createdBy: true
            },
            order: {
                created_at: "DESC"
            }
        })
        return confs;
    }

    //Add Conf
    async addConf(confInput: ConfInput, reqUser: ReqUser) {
        const conf = await this.confRepository.findOne({
            where: {
                classId: { id: confInput.classId }
            }
        });
        if (conf) throw new NotFoundException("Exam configuration for this class already added!");
        const exams = await Promise.all(
            confInput.examId.map((id: string) => this.examRepository.findOneBy({ id: id }))
        );
        const totalMarks = await Promise.all(
            confInput.subjects.map(async (item) => {
                let subject;
                if (item.subjectId) {
                    subject = await this.subjectRepository.findOne({
                        where: { id: item.subjectId }
                    });
                }
                const totalMarks = this.totalMarkRepository.create({
                    totalMarks: item.totalMarks,
                    subjectId: subject
                });
                return this.totalMarkRepository.save(totalMarks);
            })
        );
        const newConf = this.confRepository.create({
            classId: { id: confInput.classId },
            examId: exams,
            subjects: totalMarks,
            createdBy: { id: reqUser.id }
        })
        await this.confRepository.save(newConf);
        return {
            success: true,
            message: "Exam configuration added successfully!"
        }
    };

    //Delete
    async deleteConf(id: string) {
        try {
            const result = await this.confRepository.delete(id);
            if (result.affected === 0) throw new NotFoundException("Exam configuration not found!");
        } catch {
            throw new NotFoundException("Cannot delete exam configuration because it has related record!");
        }
        return {
            success: true,
            message: "Exam Configuration Deleted Successfully!"
        }
    };

}