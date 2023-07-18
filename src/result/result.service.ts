import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

//Entity
import { Result } from "./model/result.entity";
import { Marks } from "./model/marks.entity";
import { Student } from "src/student/model/student.entity";
import { Conf } from "src/exam/model/conf.entity";
import { Exam } from "src/exam/model/exam.entity";

//Dto
import { ResultSearchInput } from "./dto/result-search.dto";
import { MarksInput } from "./dto/marks.dto";
import { ResultPramsInput } from "./dto/result-prams.dto";

//Req user
import { ReqUser } from "@/auth/Types/user.types";

@Injectable()
export class ResultService {
    //Constructor
    constructor(
        @InjectRepository(Result) private resultRepository: Repository<Result>,
        @InjectRepository(Marks) private markRepository: Repository<Marks>,
        @InjectRepository(Student) private studentRepository: Repository<Student>,
        @InjectRepository(Conf) private confRepository: Repository<Conf>,
        @InjectRepository(Exam) private examRepository: Repository<Exam>
    ) { };

    //Get all result
    async gets(resultPramsInput: ResultPramsInput) {
        const result = await this.resultRepository.find({
            where: {
                classId: { id: resultPramsInput.classId },
                shiftId: { id: resultPramsInput.shiftId },
                sectionId: { id: resultPramsInput.sectionId },
                groupId: { id: resultPramsInput.groupId },
                examId: { id: resultPramsInput.examId },
                session: resultPramsInput.session
            },
            relations: {
                studentId: true,
                gradeId: true,
                marks: {
                    subjectId: true
                }
            }
        });
        console.log(result);
        return result;
    };

    //Get result by subject
    async getSubjectResult(resultSearchInput: ResultSearchInput, reqUser: ReqUser) {
        const conf = await this.confRepository.findOne({
            where: {
                classId: { id: resultSearchInput.classId }
            },
            relations: {
                examId: true,
                subjects: {
                    subjectId: true
                }
            }
        });
        if (!conf) throw new NotFoundException("Please add exam configuration for your selected class first!");
        const result = await this.resultRepository.find({
            where: {
                classId: { id: resultSearchInput.classId },
                shiftId: { id: resultSearchInput.shiftId },
                sectionId: { id: resultSearchInput.sectionId },
                ...(resultSearchInput.groupId !== "" ? { groupId: { id: resultSearchInput.groupId } } : {}),
                examId: { id: resultSearchInput.examId },
                session: resultSearchInput.session
            },
            relations: {
                studentId: true,
                gradeId: true,
            }
        });
        for (const rest of result) {
            const marks = await this.markRepository.find({
                where: {
                    subjectId: { id: resultSearchInput.subjectId },
                    result: { id: rest.id }
                },
                relations: {
                    subjectId: true,
                    createdBy: true
                }
            });
            if (rest && marks.length === 0) {
                if (new Date().getFullYear() !== Number(resultSearchInput.session)) throw new NotFoundException("Result not found for this session!")
                const newMarks = await this.markRepository.create({
                    subjectId: { id: resultSearchInput.subjectId },
                    result: rest,
                    fullMarks: Number(conf.subjects.find(item => item.subjectId.id === resultSearchInput.subjectId).totalMarks),
                    createdBy: { id: reqUser.id }
                })
                const marksData = await this.markRepository.save(newMarks);
                rest.marks = [marksData]
            } else {
                rest.marks = marks;
            }
        };
        if (result.length > 0) {
            return result
        } else {
            if (new Date().getFullYear() !== Number(resultSearchInput.session)) throw new NotFoundException("Result not found for this session!");
            const students = await this.studentRepository.find({
                where: {
                    class: { id: resultSearchInput.classId },
                    shift: { id: resultSearchInput.shiftId },
                    section: { id: resultSearchInput.sectionId },
                    ...(resultSearchInput.groupId !== "" ? { group: { id: resultSearchInput.groupId } } : {}),
                }
            });
            if (students.length === 0) throw new NotFoundException("No Student found in this class");
            const exam = await this.examRepository.findOne({
                where: {
                    id: resultSearchInput.examId
                },
                relations: {
                    type: true
                }
            });
            if (!exam) throw new NotFoundException("Please add an exam first!");
            if (!conf.examId.find(item => Number(item.id) === Number(resultSearchInput.examId))) throw new NotFoundException("Exam not included in your selected class!");
            if (!conf.subjects.find(item => Number(item.subjectId.id) === Number(resultSearchInput.subjectId))) throw new NotFoundException("Subject not included in your selected class");
            for (const student of students) {
                const newResult = await this.resultRepository.create({
                    examId: { id: resultSearchInput.examId },
                    classId: { id: resultSearchInput.classId },
                    shiftId: { id: resultSearchInput.shiftId },
                    sectionId: { id: resultSearchInput.sectionId },
                    ...(resultSearchInput.groupId !== "" ? { groupId: { id: resultSearchInput.groupId } } : {}),
                    studentId: { id: student.id },
                    confId: { id: conf.id },
                    gradeId: { id: exam.type.id },
                    session: resultSearchInput.session
                });
                await this.resultRepository.save(newResult);
                const newMarks = await this.markRepository.create({
                    subjectId: { id: resultSearchInput.subjectId },
                    result: newResult,
                    createdBy: { id: reqUser.id },
                    fullMarks: Number(conf.subjects.find(item => Number(item.subjectId.id) === Number(resultSearchInput.subjectId)).totalMarks)
                });
                const marksData = await this.markRepository.save(newMarks);
                newResult.marks = [marksData];
            }
            const result = await this.resultRepository.find({
                where: {
                    classId: { id: resultSearchInput.classId },
                    shiftId: { id: resultSearchInput.shiftId },
                    sectionId: { id: resultSearchInput.sectionId },
                    ...(resultSearchInput.groupId !== "" ? { groupId: { id: resultSearchInput.groupId } } : {}),
                    examId: { id: resultSearchInput.examId },
                    session: resultSearchInput.session
                },
                relations: {
                    studentId: true,
                    gradeId: true,
                }
            });
            for (const rest of result) {
                const marks = await this.markRepository.find({
                    where: {
                        subjectId: { id: resultSearchInput.subjectId },
                        result: { id: rest.id }
                    },
                    relations: {
                        subjectId: true,
                        createdBy: true
                    }
                });
                rest.marks = marks;
            };
            return result
        }
    };

    //Update Marks
    async update(marksInput: MarksInput, id: string) {
        const result = await this.markRepository.update(id, marksInput);
        if (result.affected === 0) throw new NotFoundException("Result not found!");
        return {
            success: true,
            message: "Marks updated successfully!"
        }
    };
}