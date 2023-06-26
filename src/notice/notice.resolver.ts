import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";

//Service
import { NoticeService } from "./notice.service";

//Dto
import { NoticeInput } from "./dto/notice.dto";
import { SearchInput } from "@/section/dto/search.dto";

//Entity
import { SuccessInfo } from "@/user/entities/success.entity";
import { GetNotice, Notice } from "./entities/notice.entity";

//Auth guards
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";
import { Role } from "@/auth/enum/auth.enum";
import { Roles } from "@/auth/decorator/auth.decorator";

//Req user
import { ReqUser } from "@/auth/Types/user.types";

@Resolver()
export class NoticeResolver {
    //Constructor
    constructor(
        private readonly noticeService: NoticeService
    ) { };

    //Get notice list without pagination
    @Query(() => GetNotice, { name: "getNotices" })
    gets(
        @Args("searchInput") searchInput: SearchInput
    ) {
        return this.noticeService.gets(searchInput);
    };

    //Get notice list with pagination
    @Query(() => [Notice], { name: "getAllNotice" })
    getAll() {
        return this.noticeService.getAll();
    };

    //Get single notice
    @Query(() => Notice, { name: "getNotice" })
    get(
        @Args("id") id: string
    ) {
        return this.noticeService.get(id)
    };

    //Get todays notice
    @Query(() => [Notice], { name: "getTodayNotice" })
    getTodayNotice() {
        return this.noticeService.todayNotice();
    };

    //Create a notice
    @Mutation(() => SuccessInfo, { name: "addNotice" })
    @Roles(Role.ACCOUNTANT, Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    add(
        @Args("noticeInput") noticeInput: NoticeInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.noticeService.add(noticeInput, reqUser)
    };

    //Update notice
    @Mutation(() => SuccessInfo, { name: "updateNotice" })
    @Roles(Role.ACCOUNTANT, Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    update(
        @Args("noticeInput") noticeInput: NoticeInput,
        @Args("id") id: string,
        @Context("user") reqUser: ReqUser
    ) {
        return this.noticeService.update(noticeInput, id, reqUser);
    };

    //Delete notice
    @Mutation(() => SuccessInfo, { name: "deleteNotice" })
    @Roles(Role.ACCOUNTANT, Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    delete(
        @Args("id") id: string
    ) {
        return this.noticeService.delete(id);
    };
}