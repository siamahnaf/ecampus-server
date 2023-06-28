import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Raw } from "typeorm";

//Orm Entity
import { Fee } from "./model/fee.entity";

//Dto
import { FeeInput } from "./dto/fee.dto";
import { SearchInput } from "src/section/dto/search.dto";
import { FeeByClassInput } from "./dto/fee-by-class.dto";

//Req user
import { ReqUser } from "src/auth/Types/user.types";

@Injectable()
export class FeeService {
    //Constructor
    constructor(
        @InjectRepository(Fee) private feeRepository: Repository<Fee>
    ) { };

    //Get fee list
    async gets(searchInput: SearchInput) {
        let args = {}
        if (searchInput.search) {
            args["name"] = Raw(alias => `LOWER(${alias}) Like '%${searchInput.search.toLowerCase()}%'`)
        }
        const fees = await this.feeRepository.find({
            where: args,
            relations: {
                class: true,
                shift: true,
                section: true,
                group: true,
                createdBy: true
            },
            order: {
                created_at: "DESC"
            }
        });
        return fees;
    };

    //Get fees by class
    async getsByClass(feeByClassInput: FeeByClassInput) {
        const fees = await this.feeRepository.find({
            where: {
                class: { id: feeByClassInput.classId },
                shift: { id: feeByClassInput.shiftId },
                section: { id: feeByClassInput.sectionId },
                ...(feeByClassInput.groupId !== "" ? { group: { id: feeByClassInput.groupId } } : {}),
            },
            relations: {
                class: true,
                shift: true,
                section: true,
                group: true,
                createdBy: true
            },
            order: {
                created_at: "DESC"
            }
        });
        return fees;
    }

    //Add fees
    async add(feeInput: FeeInput, reqUser: ReqUser) {
        const fee = await this.feeRepository.findOneBy({
            name: feeInput.name,
            class: { id: feeInput.class }
        });
        if (fee) throw new NotFoundException("Fee already added!");
        const { group, ...rest } = feeInput;
        const newFee = this.feeRepository.create({
            ...rest,
            class: { id: feeInput.class },
            shift: { id: feeInput.shift },
            section: { id: feeInput.section },
            ...(feeInput.group !== "" ? { group: { id: feeInput.group } } : {}),
            createdBy: { id: reqUser.id }
        });
        await this.feeRepository.save(newFee);
        return {
            success: true,
            message: "Fees added successfully!"
        }
    };

    //Update Fees
    async update(id: string, feeInput: FeeInput, reqUser: ReqUser) {
        const { group, ...rest } = feeInput;
        const result = await this.feeRepository.update(id, {
            ...rest,
            class: { id: feeInput.class },
            shift: { id: feeInput.shift },
            section: { id: feeInput.section },
            ...(feeInput.group !== "" ? { group: { id: feeInput.group } } : {}),
            createdBy: { id: reqUser.id }
        });
        if (result.affected === 0) throw new NotFoundException("Fees not found!");
        return {
            success: true,
            message: "Fee updated successfully!"
        }
    };

    //Delete Fee
    async delete(id: string) {
        try {
            const result = await this.feeRepository.delete(id);
            if (result.affected === 0) throw new NotFoundException("Fees not found!");
        } catch {
            throw new NotFoundException("Cannot delete fee because it has related record!");
        }
        return {
            success: true,
            message: "Fees deleted successfully!"
        }
    };
}