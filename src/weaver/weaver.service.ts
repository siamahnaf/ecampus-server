import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

//Entity
import { Weaver } from "./model/weaver.entity";
import { Student } from "@/student/model/student.entity";

//Dto
import { WeaverInput } from "./dto/weaver.dto";

//Req user
import { ReqUser } from "@/auth/Types/user.types";

@Injectable()
export class WeaverService {
    //Constructor
    constructor(
        @InjectRepository(Weaver) private weaverRepository: Repository<Weaver>,
        @InjectRepository(Student) private studentRepository: Repository<Student>,
    ) { };

    //Get weavers
    async gets(id: string) {
        const student = await this.studentRepository.findOne({
            where: {
                studentId: id
            },
            relations: {
                class: true,
                shift: true,
                section: true,
                group: true
            }
        });
        if (!student) throw new NotFoundException("Student not found!");
        const weavers = await this.weaverRepository.find({
            where: {
                student: { id: student.id }
            },
            relations: {
                createdBy: true,
                fee: true
            }
        });
        return {
            student,
            weavers
        }
    };

    //Add weavers
    async add(weaverInput: WeaverInput, reqUser: ReqUser) {
        const weaver = await this.weaverRepository.findOne({
            where: {
                fee: { id: weaverInput.fee }
            }
        });
        if (weaver) throw new NotFoundException("Weaver already added!");
        const newWeaver = this.weaverRepository.create({
            ...weaverInput,
            fee: { id: weaverInput.fee },
            student: { id: weaverInput.student },
            createdBy: { id: reqUser.id }
        });
        await this.weaverRepository.save(newWeaver);
        return {
            success: true,
            message: "Weaver added successfully!"
        }
    };

    //Update weavers
    async update(weaverInput: WeaverInput, id: string, reqUser: ReqUser) {
        const weaver = await this.weaverRepository.findOne({
            where: {
                id: id
            },
            relations: {
                fee: true
            }
        });
        if (!weaver) throw new NotFoundException("Weaver not found!")
        if (weaver.fee.id !== weaverInput.fee) {
            const exist = await this.weaverRepository.findOneBy({
                fee: { id: weaverInput.fee }
            })
            if (exist) throw new NotFoundException("Weaver already exist!");
        }
        await this.weaverRepository.update(weaver.id, {
            ...weaverInput,
            fee: { id: weaverInput.fee },
            student: { id: weaverInput.student },
            createdBy: { id: reqUser.id }
        });
        return {
            success: true,
            message: "Weaver updated successfully!"
        }
    };

    //Delete weavers
    async delete(id: string) {
        try {
            const result = await this.weaverRepository.delete(id);
            if (result.affected === 0) throw new NotFoundException("Weaver not found!")
        } catch {
            throw new NotFoundException("Weaver can't be delete because it has related record!");
        }
        return {
            success: true,
            message: "Weaver deleted successfully!"
        }
    };
}