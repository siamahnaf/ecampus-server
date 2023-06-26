import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Between } from "typeorm";
import * as moment from "moment";
import { paginate, PaginationTypeEnum } from "nestjs-typeorm-paginate";

//Orm Entity
import { Notice } from "./model/notice.entity";

//Dto
import { NoticeInput } from "./dto/notice.dto";
import { SearchInput } from "@/section/dto/search.dto";

//Req user
import { ReqUser } from "@/auth/Types/user.types";

@Injectable()
export class NoticeService {
    //Constructor
    constructor(
        @InjectRepository(Notice) private readonly noticeRepository: Repository<Notice>
    ) { };

    //Get notice list with pagination
    async gets(searchInput: SearchInput) {
        const notices = await this.noticeRepository
            .createQueryBuilder("notice")
            .leftJoinAndSelect("notice.createdBy", "createdBy")
            .orderBy("notice.created_at", searchInput.orderBy ?? "DESC")

        if (searchInput.search) {
            notices.where("LOWER(section.title) LIKE :search", { search: `%${searchInput.search.toLowerCase()}%` })
        }

        const { items, meta } = await paginate<Notice>(notices, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    };

    //Get notice list without pagination
    async getAll() {
        const notices = await this.noticeRepository.find({
            relations: {
                createdBy: true
            },
            order: {
                created_at: "DESC"
            }
        });
        return notices;
    }

    //Get single notice
    async get(id: string) {
        const notice = await this.noticeRepository.findOne({
            where: { id: id },
            relations: {
                createdBy: true
            },
        });
        if (!notice) throw new NotFoundException("No notice found with the id!");
        return notice;
    }

    //Get todays notice
    async todayNotice() {
        const notices = await this.noticeRepository.find({
            where: {
                created_at: Between(moment().startOf("day").toDate(), moment().endOf("day").toDate())
            },
            relations: {
                createdBy: true
            },
            order: {
                created_at: "DESC"
            }
        });
        return notices;
    };

    //Add notice
    async add(noticeInput: NoticeInput, reqUser: ReqUser) {
        const newNotice = this.noticeRepository.create({
            ...noticeInput,
            createdBy: { id: reqUser.id }
        });
        await this.noticeRepository.save(newNotice);
        return {
            success: true,
            message: "Notice added successfully!"
        }
    };

    //Update
    async update(noticeInput: NoticeInput, id: string, reqUser: ReqUser) {
        const result = await this.noticeRepository.update(id, {
            ...noticeInput,
            createdBy: { id: reqUser.id }
        })
        if (result.affected === 0) throw new NotFoundException("Notice not found!");
        return {
            success: true,
            message: "Notice updated successfully!"
        }
    };

    //Delete notice
    async delete(id: string) {
        try {
            const result = await this.noticeRepository.delete(id);
            if (result.affected === 0) throw new NotFoundException("Notice not found!");
        } catch {
            throw new NotFoundException("Cannot delete notice because it has related record!");
        }
        return {
            success: true,
            message: "Notice deleted successfully!"
        }
    };
}